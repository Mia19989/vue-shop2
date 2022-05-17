// 挂载到全局的方法
import { App } from 'vue'
import formatUtcSring from '@/utils/date-format'

export default function registerProperties(app: App) {
  // $filters对象里 挂载很多方法
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcSring(value)
    }
  }
}
