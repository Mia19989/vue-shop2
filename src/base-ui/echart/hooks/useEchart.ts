// 封装echarts
import * as echarts from 'echarts'

export default function useEchart(el: HTMLElement) {
  const echartInstance = echarts.init(el)
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 监听浏览时窗口大小的改变 -> echarts实例大小改变
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  // 更新echarts实例大小
  const updateSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
