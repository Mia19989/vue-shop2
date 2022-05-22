<template>
  <div class="page-model">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      center
      destroy-on-close
    >
      <hcc-form v-bind="modelConfig" v-model="formData"></hcc-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import HccForm from '@/base-ui/form'
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  components: {
    HccForm
  },

  props: {
    modelConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      // 默认是空对象
      default: () => ({})
    }
  },

  setup(props) {
    // 默认不显示 新建用户对话框
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    // 监听回显内容的变化
    watch(
      () => props.defaultInfo,
      (newValue) => {
        // 注意这里遍历的是formItems列表
        for (const item of props.modelConfig.formItems) {
          // 更新属性值
          formData.value[`${item.field}`] = newValue[`${item.field}`]
          // console.log(formData.value[`${item.field}`])
        }
      }
    )
    return {
      dialogVisible,
      formData
    }
  }
})
</script>

<style scoped></style>
