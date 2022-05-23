<template>
  <div class="dashboard">
    <div ref="divRef" :style="{ width: '400px', height: '300px' }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import * as echarts from 'echarts'

export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // 初始echarts实例
      const echartInstance = echarts.init(divRef.value!)
      // 编写配置项
      const option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
      // 设置配置，开始绘制图表
      echartInstance.setOption(option)
    })
    return { divRef }
  }
})
</script>

<style scoped></style>
