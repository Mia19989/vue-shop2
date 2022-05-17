<template>
  <div class="user">
    <page-search :searchFromConfig="searchFromConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig"></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent
  },

  setup() {
    return {
      // 表单属性配置
      searchFromConfig,
      // table表格属性配置
      contentTableConfig
    }
  }
})
</script>

<style scoped lang="less"></style>
