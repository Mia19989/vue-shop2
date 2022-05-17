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
        <el-table-column v-bind="propItem" align="center">
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
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
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
    }
  },

  emits: ['selectionChange'],
  setup(props, { emit }) {
    // 多选事件监听
    const handleSelectionChange = (value: any) => {
      // console.log(value)
      emit('selectionChange', value)
    }
    return {
      handleSelectionChange
    }
  }
})
</script>

<style scoped lang="less">
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
    text-align: right;
  }
}
</style>
