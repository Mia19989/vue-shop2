<template>
  <!-- 饼状图 -->
  <div class="pie-echart">
    <base-echart :options="options"></base-echart>
  </div>
</template>

<script lang="ts" setup>
import BaseEchart from '@/base-ui/echart'
import { defineProps, computed } from 'vue'
import { IDataType } from '../types'

const props = defineProps<{
  // 饼状图的数据
  pieData: IDataType[]
}>()

// 考虑到饼状图的数据会发生变化 -> 用computed计算属性
const options = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // 图例列表布局朝向 水平
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>

<style scoped></style>
