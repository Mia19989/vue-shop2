<template>
  <div class="page-search">
    <!-- 表单双向数据绑定 -->
    <!-- v-model双向绑定传值的话 props中是modelValue接收传值 -->
    <hcc-form v-bind="searchFromConfig" v-model="formData">
      <template #header>
        <h1 class="header">高级检索</h1>
      </template>

      <template #footer>
        <div class="footer-btns">
          <el-button type="primary" icon="Search">搜索</el-button>
          <el-button type="primary" icon="Edit">重置</el-button>
        </div>
      </template>
    </hcc-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HccForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFromConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HccForm
  },

  setup(props) {
    // 表单数据
    // 优化1: formData属性动态决定 不应该写死 (双向绑定的属性应该 由配置文件里的field决定)
    const formItems = props.searchFromConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      // 初始化是空字符串
      formOriginData[item.field] = ''
    }
    // ref双向绑定 (双向绑定的数据是对象 建议用ref 简单的数据类型可以直接双向绑定)
    const formData = ref(formOriginData)

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
.header {
  color: red;
}

.footer-btns {
  text-align: right;
  padding: 0 20px 10px 0;
}
</style>
