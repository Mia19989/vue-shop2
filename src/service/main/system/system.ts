// system模块 发送数据请求
import hccRequest from '../../index'
import { IDataType } from '../../types'

// post请求 获取用户列表数据
export function getPageListData(url: string, queryInfo: any) {
  return hccRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

// delete请求 删除某列表数据
// url
export function deletePageListData(url: string) {
  return hccRequest.delete<IDataType>({
    url: url
  })
}

// post请求 创建新数据
export function createPageListData(url: string, newData: any) {
  return hccRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

// patch请求 编辑数据
export function editPageListData(url: string, editData: any) {
  return hccRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
