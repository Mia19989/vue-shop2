<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, withDefaults, defineProps } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

// 定义props
const props = withDefaults(
  // 设置类型
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  // 默认值
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  const echartInstance = echarts.init(echartDivRef.value!)

  echartInstance.setOption(props.options)
})
</script>

<style scoped></style>
