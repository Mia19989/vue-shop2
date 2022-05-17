// post请求返回的数据类型
export interface IDataType<T = any> {
  code: number
  // 默认是any类型
  data: T
}
