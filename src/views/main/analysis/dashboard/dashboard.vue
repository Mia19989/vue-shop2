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
        <hcc-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </hcc-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <hcc-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </hcc-card>
      </el-col>
      <el-col :span="12">
        <hcc-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </hcc-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'

import HccCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',

  components: {
    HccCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart
  },

  setup() {
    // 请求数据
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    // 获取数据
    // 饼状图数据 -> 分类商品数量
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return {
          name: item.name,
          value: item.goodsCount
        }
      })
    })

    // 折线图 -> 分类商品销量
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale

      for (const item of categoryGoodsSale) {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      }

      return { xLabels, values }
    })

    // 柱状图 -> 分类商品收藏
    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor

      for (const item of categoryGoodsFavor) {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      }

      return { xLabels, values }
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor
    }
  }
})
</script>

<style scoped lang="less">
.content-row {
  margin-top: 10px;
}
</style>
