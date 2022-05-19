<template>
  <div class="hcc-table">
    <!-- 头部 -->
    <div class="header">
      <!-- 插槽占位 -->
      <slot name="header">
        <!-- 表单标题 -->
        <div class="title">{{ title }}</div>
        <!-- 新建 刷新等按钮 -->
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <!-- 序号 -->
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        align="center"
        width="60"
      ></el-table-column>

      <template v-for="propItem in propList" :key="propItem.prop">
        <!-- v-bind 绑定属性 -->
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 作用域插槽 -> 处理需要渲染按钮等的数据 -->
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">{{
              scope.row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 底部 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    // 列表标题
    title: {
      type: String,
      default: ''
    },
    // 列表数据
    listData: {
      type: Array,
      required: true
    },
    // 表格数据的数量
    listCount: {
      type: Number,
      default: 0
    },
    // 列表属性配置
    propList: {
      type: Array,
      required: true
    },
    // 是否显示序号
    showIndexColumn: {
      type: Boolean,
      defalut: false
    },
    // 是否显示选择多行
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    // 双向绑定pageInfo
    // 父组件 v-model:page 重命名绑定的是page 如果不重命名默认绑定在modelValue上
    // 只是给pageInfo绑定 不是整个table 建议不要绑定在modelValue上
    // 默认向父组件传值的时候 updata:modelValue 修改之后就是 updata:page
    page: {
      type: Object,
      // 注意是object类型 默认值设置要用箭头函数
      default: () => ({
        // 页面大小
        pageSize: 10,
        // 页码
        currentPage: 0
      })
    }
  },

  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 多选事件监听
    const handleSelectionChange = (value: any) => {
      // console.log(value)
      emit('selectionChange', value)
    }

    // 监听pageSize页面大小的改变
    const handleSizeChange = (pageSize: number) => {
      // 传给父组件 pageSize改变后的值
      emit('update:page', { ...props.page, pageSize })
    }

    // 监听currentPage页码的改变
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.el-table {
  & ::v-deep th.el-table__cell,
  ::v-deep td.el-table__cell {
    // 设置position 使得 子元素不与其产生新的层叠关系
    position: static;
  }
}

.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    // text-align: right;
  }
}
</style>
