// vuex管理共享状态 1.封装共享数据
import { createStore, Store, useStore as useVuexStore } from 'vuex'
// 导入state类型
import { IRootState, IStoreType } from './type'
import login from './login/login'
// 引入system模块
import system from './main/system/system'

// 创建store对象
const store = createStore<IRootState>({
  // 数据
  state() {
    return {
      name: 'hcc',
      age: 13
    }
  },

  getters: {},
  mutations: {},

  // 响应状态变化 actions 相当于 methods
  actions: {},
  modules: {
    login,
    system
  }
})

// 解决刷新页面 导致vuex内的数据被清除的问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 封装自定义的useStore 增加了自定义的类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
