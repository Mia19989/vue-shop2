// system模块 发送数据请求
import hccRequest from '../../index'
import { IDataType } from '../../types'

// post请求 获取用户列表数据
export function getPageLsitData(url: string, queryInfo: any) {
  return hccRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
