<template>
  <div class="menu">
    <page-search
      :searchFromConfig="searchFromConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      ref="pageContentRef"
      pageName="menu"
      dataName="菜单"
    ></page-content>
    <page-model></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'hcc-menu',
  components: {
    PageContent,
    PageSearch,
    PageModel
  },
  setup() {
    // page-search中 搜索 重置
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    return {
      contentTableConfig,
      searchFromConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style scoped></style>
