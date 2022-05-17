import { Module } from 'vuex'
import { IRootState } from '../type'
import { ILoginState } from './type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import { IAccount } from '@/service/login/type'
import localCache from '@/utils/cache'
import router from '@/router/index'
import { mapMenuToRoutes } from '@/utils/map-menus'

// 注意：Module<S, R> S: 模块中state类型 R: 根store中state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },

  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },

    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },

    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      const routes = mapMenuToRoutes(userMenus)
      // console.log(routes)

      // 添加路由 -> 将routes添加到 main.children中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  },

  actions: {
    // 账号登录
    // commit上下文 payload接收的信息
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.发送登录请求
      // console.log('执行accountLoginAction', payload)
      const accountResult = await accountLoginRequest(payload)
      const { id, token } = accountResult.data
      // console.log(accountResult)
      commit('changeToken', token)
      // 缓存token
      localCache.setCache('token', token)
      console.log(id, token)

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      // console.log(userInfoResult)
      console.log(userInfo)

      // 3.请求用户菜单
      const userMenuResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)
      console.log(userMenus)

      // 4.跳转到main首页
      router.push('/main')
    },

    loadLocalLogin({ commit }) {
      // localCache内的缓存数据添加到vuex
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo')
      if (token) {
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeUserMenus', userMenus)
        // 从菜单中 确认权限路由
      }
    },

    // 手机登录
    phoneLoginAction({ commit }, payload: any) {
      console.log('执行phoneLoginAction', payload)
    }
  }
}

export default loginModule
