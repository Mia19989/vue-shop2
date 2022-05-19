// system模块中 存储的请求数据
import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '@/store/type'
import { getPageLsitData } from '@/service/main/system/system'

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
      goodsCount: 0
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
      const pageResult = await getPageLsitData(pageUrl, payload.queryInfo)

      console.log(pageResult)
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
    }
  }
}

export default systemModule
