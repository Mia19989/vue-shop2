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
      userList: [],
      // 用户数量
      userCount: 0,
      // 角色列表
      roleList: [],
      // 角色数量
      roleCount: 0
    }
  },
  mutations: {
    // state里的userList userCount数据发生改变
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },

    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },

    changeRoleList(state, list: any[]) {
      state.roleList = list
    },

    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },

  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userList
          case 'role':
            return state.roleList
        }
      }
    },

    pageCountData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.userCount
          case 'role':
            return state.roleCount
        }
      }
    }
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageName = payload.pageName
      let pageUrl = ''

      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
      }
      // const pageUrl = `${pageName}/list`
      // console.log(payload.pageUrl)
      // console.log(payload.queryInfo)

      // 发送请求
      const pageResult = await getPageLsitData(pageUrl, payload.queryInfo)

      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      // console.log(list, totalCount)
      switch (pageName) {
        case 'users':
          commit('changeUserList', list)
          commit('changeUserCount', totalCount)
          break
        case 'role':
          commit('changeRoleList', list)
          commit('changeRoleCount', totalCount)
          break
      }
    }
  }
}

export default systemModule
