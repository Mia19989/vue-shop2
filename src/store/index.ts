// vuex管理共享状态 1.封装共享数据
import { createStore, Store, useStore as useVuexStore } from 'vuex'
// 导入state类型
import { IRootState, IStoreType } from './type'
import login from './login/login'
// 引入system模块
import system from './main/system/system'
import { getPageListData } from '@/service/main/system/system'

// 创建store对象
const store = createStore<IRootState>({
  // 数据
  state() {
    return {
      name: 'hcc',
      age: 13,
      entireDepartment: [],
      entireRole: []
    }
  },

  getters: {},
  mutations: {
    // 初始化的部门数据发生变化
    changeEntireDepartment(state, newDepartments) {
      state.entireDepartment = newDepartments
    },

    // 角色数据发生变化
    changeEntireRole(state, newRoles) {
      state.entireRole = newRoles
    }
  },

  // 响应状态变化 actions 相当于 methods
  actions: {
    // 获取department role的数据
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const RoleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roletList } = RoleResult.data

      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roletList)
    }
  },
  modules: {
    login,
    system
  }
})

// 解决刷新页面 导致vuex内的数据被清除的问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

// 封装自定义的useStore 增加了自定义的类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
