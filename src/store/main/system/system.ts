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
      userCount: 0
    }
  },
  mutations: {
    // state里的userList userCount数据发生改变
    changeUserList(state, userList) {
      state.userList = userList
    },

    changeUserCount(state, userCount) {
      state.userCount = userCount
    }
  },

  actions: {
    async getPageListAction({ commit }, payload: any) {
      console.log(payload.pageUrl)
      console.log(payload.queryInfo)

      // 发送请求
      const pageResult = await getPageLsitData(
        payload.pageUrl,
        payload.queryInfo
      )

      console.log(pageResult)
      const { list, totalCount } = pageResult.data
      // console.log(list, totalCount)
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    }
  }
}

export default systemModule
