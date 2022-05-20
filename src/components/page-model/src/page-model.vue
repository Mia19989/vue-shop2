<template>
  <div class="page-model">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <hcc-form v-bind="modelConfig" v-model="dataList"></hcc-form>
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
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {
    HccForm
  },

  props: {
    modelConfig: {
      type: Object,
      required: true
    }
  },

  setup() {
    // 默认显示 新建用户对话框
    const dialogVisible = ref(true)
    const dataList = ref({})
    return {
      dialogVisible,
      dataList
    }
  }
})
</script>

<style scoped></style>
