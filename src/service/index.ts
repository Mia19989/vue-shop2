// 封装axios的出口
// service统一出口
import HCCRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

// 实例对象
const hccRequest = new HCCRequest({
  baseURL: BASE_URL,
  // baseURL: 'http://152.136.185.210:5000',
  timeout: TIME_OUT,

  // 拦截器
  interceptors: {
    requestinterceptor: (config) => {
      // 添加token
      // console.log('请求成功的拦截')
      const token = localCache.getCache('token')
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`
        }
      }
      return config
    },

    requestinterceptorCatch: (error) => {
      console.log('请求失败的拦截')
      return error
    },

    responseinterceptor: (res) => {
      // console.log('响应成功的拦截')
      return res
    },

    responseinterceptorCatch: (error) => {
      console.log('响应失败的拦截')
      return error
    }
  }
})

export default hccRequest
