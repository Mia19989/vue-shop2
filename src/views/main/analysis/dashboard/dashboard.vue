<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hcc-card title="分类商品数量(饼图)"></hcc-card>
      </el-col>
      <el-col :span="10">
        <hcc-card title="不同城市商品销量"></hcc-card>
      </el-col>
      <el-col :span="7">
        <hcc-card title="分类商品数量(玫瑰图)"></hcc-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hcc-card title="分类商品的销量">
          <base-echart :options="options"></base-echart>
        </hcc-card>
      </el-col>
      <el-col :span="12">
        <hcc-card title="分类商品的收藏"></hcc-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'

import HccCard from '@/base-ui/card'
import BaseEchart from '@/base-ui/echart'

export default defineComponent({
  name: 'dashboard',

  components: {
    HccCard,
    BaseEchart
  },

  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    const options = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    }
    return {
      options
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 10px;
}
</style>
