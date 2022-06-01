<template>
  <div class="descriptions">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in tableData" :key="index"
        ><el-descriptions-item>
          <!-- 插槽label自定义标签 -->
          <template #label>{{ item.name }}</template>
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item></template
      >
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    // 描述列表的标题
    title: {
      type: String,
      default: ''
    },

    // 列数
    column: {
      type: Number,
      default: 1
    },

    // 列表数据
    tableData: {
      type: Array,
      default: () => []
    }
  },

  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.descriptions {
  margin: 15px;
}
</style>
