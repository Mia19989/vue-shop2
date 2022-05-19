<template>
  <div class="page-content">
    <hcc-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
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
import { defineComponent, computed, ref, watch } from 'vue'
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
    },
    pageName: {
      type: String,
      required: true
    }
  },

  setup(props) {
    // 结合vuex 发送数据请求
    const store = useStore()

    // 双向绑定pageInfo
    const pageInfo = ref({ pageSize: 10, currentPage: 0 })

    // page-search (中间组价调用) page-content
    const getPageData = (queryInfo: any = {}) => {
      // 发送请求
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        // pageUrl: '/users/list',
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    // setup() 最初调用一次
    getPageData()

    // 监听pageInfo的改变 重新发起请求
    watch(pageInfo, () => getPageData())

    // 保存请求获取到的数据
    // 用户列表
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    // 用户数量 -> 分页会用到
    const dataCount = computed(() =>
      store.getters[`system/pageCountData`](props.pageName)
    )

    // 处理table组件多选事件 传过来的数据
    const selectionChange = (value: any) => {
      console.log(value)
    }
    return {
      dataList,
      dataCount,
      selectionChange,
      getPageData,
      pageInfo
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
