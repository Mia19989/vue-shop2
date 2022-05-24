<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <hcc-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </hcc-card>
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
        <hcc-card title="分类商品的销量"> </hcc-card>
      </el-col>
      <el-col :span="12"> </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import HccCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',

  components: {
    HccCard,
    PieEchart
  },

  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    // 饼状图数据 -> 分类商品数量
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })

    return {
      categoryGoodsCount
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 10px;
}
</style>
