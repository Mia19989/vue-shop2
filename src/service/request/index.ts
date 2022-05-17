// 封装axios类
// 引入axios
import axios from 'axios'
// 引入axios内的类型
import type { AxiosInstance } from 'axios'
// 导入 自定义拦截器类型
import type { HCCRequestConfig, HCCRequestInterceptors } from './type'
// 导入loading组件
import { ElLoading } from 'element-plus'
// loading实例
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'

// 默认是否加载loading 加载loading
const DEFAULT_LOADING = true

class HCCRequest {
  // AxiosInstance是axios内的一个实例 instance我们自己写的实例
  private instance: AxiosInstance
  // 拦截器(可选)
  private interceptors?: HCCRequestInterceptors
  // 是否显示loading加载(可选)
  private showLoading: boolean
  // loading实例
  private loading?: LoadingInstance

  constructor(config: HCCRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 实例上的 拦截器
    // (有的话)挂载到实例的拦截器上
    this.instance.interceptors.request.use(
      // 拦截请求(可选)
      this.interceptors?.requestinterceptor,
      this.interceptors?.requestinterceptorCatch
    )

    this.instance.interceptors.response.use(
      // 拦截响应(可选)
      this.interceptors?.responseinterceptor,
      this.interceptors?.responseinterceptorCatch
    )

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功的拦截')

        // 判断是否显示loading
        if (this.showLoading) {
          // true显示
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (error) => {
        console.log('全局请求失败的拦截')
        return error
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('全局响应成功的拦截')

        // 关闭loading
        setTimeout(() => {
          this.loading?.close()
        }, 2000)

        const data = res.data
        // 错误提示 后续 用element message组件
        if (data.returnCode === '-1001') {
          console.log('请求失败~')
        } else {
          return data
        }
      },
      (error) => {
        console.log('全局响应失败的拦截')
        // 后续 element message组件
        if (error.response.status === 404) {
          console.log('提示404错误')
        }
        return error
      }
    )
  }

  // 每个请求对应的拦截
  // 发送请求
  // 返回一个promise对象 这里只负责封装 不负责获取数据 或者 提示错误
  // 返回的promise具体的类型 由request告知 使用泛型(类型参数化)
  request<T>(config: HCCRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 每个请求是否有拦截函数
      if (config.interceptors?.requestinterceptor) {
        config = config.interceptors.requestinterceptor(config)
      }

      if (config.showLoading === false) {
        // 是否设置了showLoading -> false
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseinterceptor) {
            // res 实际已经是 res.data 全局拦截 修改的res 对它有影响
            // 拦截到的是 经过全局拦截处理的
            // res此时的类型是个T 不是AxiosResponse 所以有影响
            res = config.interceptors.responseinterceptor(res)
          }
          // 这里不是输出结果 而是应该将结果 resolve出去
          // console.log(res)

          // 如果请求实例中设置了showLoading 注意重置为原来的默认值 避免影响下一个请求实例
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((error) => {
          // 注意重置为原来的默认值
          this.showLoading = DEFAULT_LOADING
          // 不返回error 而是将error reject出去
          // return error
          reject(error)
        })
    })
  }

  // 封装不同的请求类型 get post patch delete
  get<T = any>(config: HCCRequestConfig<T>): Promise<T> {
    // 这里的method 是HCCRequestConfig 继承自 AxiosRequestConfig的
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: HCCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  patch<T = any>(config: HCCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }

  delete<T = any>(config: HCCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

// 导出
export default HCCRequest
