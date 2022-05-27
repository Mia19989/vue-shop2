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
        <!-- 新建数据 -->
        <el-button type="primary" v-if="isCreate" @click="handleNewClick"
          >新建{{ dataName }}</el-button
        >
        <!-- 删除 多选选中的数据 -->
        <el-button v-if="isDelete" type="danger" @click="handleMultiDeleteClick"
          >删除{{ dataName }}</el-button
        >
        <!-- <el-button icon="Loading" type="success"></el-button> -->
      </template>

      <!-- 列中的插槽 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handler-btns">
          <el-button
            v-if="isUpdate"
            size="small"
            type="primary"
            icon="Edit"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <!-- <el-button
            v-if="isDelete"
            size="small"
            type="danger"
            icon="Delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          > -->
          <!-- 删除 消息弹出框 -> 确认删除操作 -->
          <el-button
            v-if="isDelete"
            size="small"
            type="danger"
            icon="Delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- '跨组件的' 动态插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <!-- 判断存在slotName -->
        <template v-if="item.slotName">
          <!-- :row="scope.row" 传这一行的数据 -->
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hcc-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/usePermission'
import { ElMessage, ElMessageBox } from 'element-plus'

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
    },
    // 按钮操作的对象名
    dataName: {
      type: String,
      default: '数据'
    }
  },

  emits: ['newBtnClick', 'editBtnClick'],

  setup(props, { emit }) {
    // 结合vuex 发送数据请求
    const store = useStore()

    // 获取操作权限
    // 创建
    const isCreate = usePermission(props.pageName, 'create')
    // 删除
    const isDelete = usePermission(props.pageName, 'delete')
    // 编辑
    const isUpdate = usePermission(props.pageName, 'update')
    // 请求
    const isQuery = usePermission(props.pageName, 'query')

    // 双向绑定pageInfo currentPage默认从第一页开始
    const pageInfo = ref({ pageSize: 10, currentPage: 1 })

    // 接收传值过来的 多选的数据
    const multiSelectData = new Set()

    // page-search (中间组价调用) page-content
    const getPageData = (queryInfo: any = {}) => {
      // 没有请求的权限 直接返回
      if (!isQuery) return
      // 发送请求
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        // pageUrl: '/users/list',
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
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

    // 获取其他的动态插槽名称
    // 过滤得到有slotName且需要跨组件的 动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // 过滤掉 常用插槽
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 监听删除事件
    const handleDeleteClick = async (item: any) => {
      const removeRes = await ElMessageBox.confirm(
        '是否确认删除操作？',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      // 取消删除
      if (removeRes !== 'confirm') {
        return ElMessage({
          type: 'info',
          message: '取消删除'
        })
      }

      // 确认删除 -> 发送删除请求
      const { code: result } = await store.dispatch(
        'system/deletePageListAction',
        {
          pageName: props.pageName,
          id: item.id
        }
      )
      if (result === 0) {
        return ElMessage({
          type: 'success',
          message: '删除成功'
        })
      } else {
        return ElMessage({
          type: 'error',
          message: '删除失败！'
        })
      }

      // const { code: result } = await store.dispatch(
      //   'system/deletePageListAction',
      //   {
      //     pageName: props.pageName,
      //     id: item.id
      //   }
      // )
      // console.log(result)
    }

    // 父组件实现具体操作
    // 监听新建数据事件
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    // 监听编辑数据事件
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    // 处理table组件多选事件 传过来的数据
    const selectionChange = (value: any) => {
      for (const item of value) {
        // 转化成了对象 从对象中获取id
        // console.log('直接获取proxy里面的数据', item.id)
        multiSelectData.add(item.id)
      }
      // console.log(value)
      // console.log(multiSelectData)
    }

    // 删除多选的数据
    const handleMultiDeleteClick = async () => {
      // console.log('点击删除多选的数据')
      // 1. 判断没有选中数据 不能进行删除操作
      if (multiSelectData.size === 0) {
        return ElMessage({
          type: 'info',
          message: '请选择要操作的数据！'
        })
      }

      // 2. 弹窗提示是否确认删除多选中的数据
      const multiRemoveRes = await ElMessageBox.confirm(
        '是否确认删除被选中的数据？',
        '提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)

      // 取消多选删除
      if (multiRemoveRes !== 'confirm') {
        return ElMessage({
          type: 'info',
          message: '取消删除'
        })
      }

      // 3. 确认删除多选数据 -> 发送请求
      const res = await store.dispatch(
        'system/multiSelectDeletePageListAction',
        {
          pageName: props.pageName,
          ids: multiSelectData
        }
      )

      // console.log('返回的结果：', res.has(0))
      if (res.has(0)) {
        return ElMessage({
          type: 'success',
          message: '删除成功'
        })
      } else {
        return ElMessage({
          type: 'error',
          message: '删除失败！'
        })
      }
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      isQuery,
      selectionChange,
      getPageData,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      handleMultiDeleteClick
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
