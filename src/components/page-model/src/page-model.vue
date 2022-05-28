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
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import HccForm from '@/base-ui/form'
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

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
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props) {
    // 默认不显示 新建用户对话框
    const dialogVisible = ref(false)
    const formData = ref<any>({})

    const store = useStore()

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

    // 确认新建 / 编辑
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 区分确认的是 新建 or 编辑
      if (Object.keys(props.defaultInfo).length) {
        // defaultInfo有值 是编辑
        console.log('编辑数据')
        store.dispatch('system/editPageListAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 创建新数据请求
        // console.log('新建数据')
        store.dispatch('system/createPageListAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
