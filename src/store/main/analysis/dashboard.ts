import { Module } from 'vuex'
import { IDashboardState } from './types'
import { IRootState } from '@/store/type'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getCityGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 分类商品数量
      categoryGoodsCount: [],
      // 分类商品销量
      categoryGoodsSale: [],
      // 收藏数量
      categoryGoodsFavor: [],
      // 不同城市销量
      cityGoodsSale: []
    }
  },

  mutations: {
    changeCategoryGoodsCount(state, newData) {
      state.categoryGoodsCount = newData
    },

    changeCategoryGoodsSale(state, newData) {
      state.categoryGoodsSale = newData
    },

    changeCategoryGoodsFavor(state, newData) {
      state.categoryGoodsFavor = newData
    },

    changeCityGoodsCount(state, newData) {
      state.cityGoodsSale = newData
    }
  },

  actions: {
    // 请求获取数据
    async getDashboardDataAction({ commit }) {
      // 发送请求
      const categoryGoodsCountResult = await getCategoryGoodsCount()
      // console.log(categoryGoodsCountResult)
      const categoryGoodsSaleResult = await getCategoryGoodsSale()
      const categoryGoodsFavorResult = await getCategoryGoodsFavor()
      const cityGoodsSaleResult = await getCityGoodsSale()

      commit('changeCategoryGoodsCount', categoryGoodsCountResult.data)
      commit('changeCategoryGoodsSale', categoryGoodsSaleResult.data)
      commit('changeCategoryGoodsFavor', categoryGoodsFavorResult.data)
      commit('changeCityGoodsCount', cityGoodsSaleResult.data)
    }
  }
}

export default dashboardModule
