<template>
  <div class="page-content">
    <hcc-table
      :listData="userList"
      v-bind="contentTableConfig"
      @selectionChange="selectionChange"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button type="primary">新建用户</el-button>
        <!-- <el-button icon="Loading" type="success"></el-button> -->
      </template>

      <!-- 列中的插槽 -->
      <template #status="scope">
        <!-- 从这一行中的数据获取enable -->
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          size="small"
          plain
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-button size="small" type="primary" icon="Edit">编辑</el-button>
          <el-button size="small" type="danger" icon="Delete">删除</el-button>
        </div>
      </template>
    </hcc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import HccTable from '@/base-ui/table'
export default defineComponent({
  components: {
    HccTable
  },

  props: {
    contentTableConfig: {
      type: Object,
      required: true
    }
  },

  setup() {
    // 结合vuex 发送数据请求
    const store = useStore()
    // 发送请求
    store.dispatch('system/getPageListAction', {
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    // 保存请求获取到的数据
    // 用户列表
    const userList = computed(() => store.state.system.userList)
    // 用户数量 -> 分页会用到
    const userCount = computed(() => store.state.system.userCount)

    // 处理table组件多选事件 传过来的数据
    const selectionChange = (value: any) => {
      console.log(value)
    }
    return {
      userList,
      userCount,
      selectionChange
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
