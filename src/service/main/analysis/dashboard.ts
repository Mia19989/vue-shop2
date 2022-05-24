// dashboard模块发送数据请求
import hccRequest from '@/service'
import { IDataType } from '@/service/types'

// 枚举请求不同数据的url
enum DashboardAPI {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  cityGoodsSale = '/goods/address/sale'
}

// 请求获取数据
export function getCategoryGoodsCount() {
  return hccRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}

export function getCategoryGoodsSale() {
  return hccRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}

export function getCategoryGoodsFavor() {
  return hccRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}

export function getCityGoodsSale() {
  return hccRequest.get<IDataType>({
    url: DashboardAPI.cityGoodsSale
  })
}
