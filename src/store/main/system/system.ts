// system模块中 存储的请求数据
import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/type'
import {
  getPageListData,
  deletePageListData,
  createPageListData,
  editPageListData
} from '@/service/main/system/system'
import { ElMessage } from 'element-plus'

const systemModule: Module<ISystemState, IRootState> = {
  // 作用域！
  namespaced: true,
  state() {
    return {
      // 用户列表
      usersList: [],
      // 用户数量
      usersCount: 0,
      // 角色列表
      roleList: [],
      // 角色数量
      roleCount: 0,
      // 商品列表
      goodsList: [],
      // 商品数量
      goodsCount: 0,
      // 菜单列表
      menuList: [],
      // 菜单数量
      menuCount: 0,
      // 部门列表
      departmentList: [],
      // 部门数量
      departmentCount: 0,
      // 商品类别列表 数量
      categoryList: [],
      categoryCount: 0
    }
  },
  mutations: {
    // state里的userList userCount数据发生改变
    changeUsersList(state, userList: any[]) {
      state.usersList = userList
    },

    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount
    },

    changeRoleList(state, list: any[]) {
      state.roleList = list
    },

    changeRoleCount(state, count: number) {
      state.roleCount = count
    },

    changeGoodsList(state, list: any[]) {
      state.goodsList = list
    },

    changeGoodsCount(state, count: number) {
      state.goodsCount = count
    },

    changeMenuList(state, list: any[]) {
      state.menuList = list
    },

    changeMenuCount(state, count: number) {
      state.menuCount = count
    },

    changeDepartmentList(state, list: any[]) {
      state.departmentList = list
    },

    changeDepartmentCount(state, count: number) {
      state.departmentCount = count
    },

    changeCategoryList(state, list: any[]) {
      state.categoryList = list
    },

    changeCategoryCount(state, count: number) {
      state.categoryCount = count
    }
  },

  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // 注意这里直接拼接不允许 -> 将state类型改成any
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },

    pageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
        // switch (pageName) {
        //   case 'users':
        //     return state.userCount
        //   case 'role':
        //     return state.roleCount
        // }
      }
    }
  },

  actions: {
    // 请求获取数据
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }
      // const pageUrl = `${pageName}/list`
      // console.log(payload.pageUrl)
      // console.log(payload.queryInfo)

      // 发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // console.log(pageResult)
      const { list, totalCount } = pageResult.data
      // console.log(list, totalCount)

      // pageName -> 改成 首字母大写
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
      // switch (pageName) {
      //   case 'users':
      //     commit('changeUserList', list)
      //     commit('changeUserCount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleCount', totalCount)
      //     break
      // }
    },

    // 请求删除数据
    async deletePageListAction(context, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `${pageName}/${id}`

      // 1. 发送删除数据请求
      // url -> users/id
      const deletePageListResult = await deletePageListData(pageUrl)
      // console.log('删除成功返回的数据: ', deletePageListResult.code)

      // 2. 重新请求数据
      this.dispatch('system/getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })

      // 返回一个promise对象
      return deletePageListResult
    },

    // 请求删除多选中的数据
    async multiSelectDeletePageListAction(context, payload: any) {
      // 1. 发送请求
      // ids是被多选中的所有id 是set对象
      const { pageName, ids } = payload

      // 请求返回的结果集
      const results = new Set()
      for (const id of ids) {
        console.log('对象里的每个id是：', id)
        const result = await deletePageListData(`${pageName}/${id}`)
        results.add(result.code)
      }
      // console.log('多选删除的返回结果：', results)

      // 2. 重新请求数据
      this.dispatch('system/getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })

      // 返回一个promise对象
      return results
    },

    // 创建请求
    async createPageListAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`

      // 1.发送创建请求
      const createPageListResult = await createPageListData(pageUrl, newData)
      // console.log('创建成功返回的数据：', createPageListResult)

      // 弹窗提示创建成功or失败
      if (createPageListResult.code === 0) {
        ElMessage({
          message: '创建成功',
          type: 'success'
        })
      } else {
        ElMessage.error('创建失败！')
      }

      // 2. 重新请求数据
      this.dispatch('system/getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    // 编辑请求
    async editPageListAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`

      // 1.发送编辑请求
      const editPageListResult = await editPageListData(pageUrl, editData)
      // console.log('编辑成功返回的数据：', editPageListResult)

      // 弹窗提示创建成功or失败
      if (editPageListResult.code === 0) {
        ElMessage({
          message: '编辑成功',
          type: 'success'
        })
      } else {
        ElMessage.error('编辑失败！')
      }

      // 2. 重新请求数据
      this.dispatch('system/getPageListAction', {
        pageName: pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
