import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 接口定义拦截类型 拦截器 -> 可以拦截的请求的类型有哪些
export interface HCCRequestInterceptors<T = AxiosResponse> {
  // 拦截请求(可选) -> 函数(参数：参数类型) 函数返回类型是AxiosRequestConfig
  requestinterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 拦截请求错误
  requestinterceptorCatch?: (error: any) => any
  // 响应类型 使用泛型 默认值是AxiosResponse
  responseinterceptor?: (res: T) => T
  // 拦截响应错误
  responseinterceptorCatch?: (error: any) => any
}

// 继承了AxiosRequestConfig里面的方法、属性 增加拦截器属性(限制拦截函数的类型)
export interface HCCRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  // 增加属性 拦截器interceptors 类型是HCCRequestInterceptors
  interceptors?: HCCRequestInterceptors<T>
  // 是否显示loading组件
  showLoading?: boolean
}
