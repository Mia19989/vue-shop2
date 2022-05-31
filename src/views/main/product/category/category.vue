<template>
  <div class="category">
    <page-search
      :searchFromConfig="searchFromConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      dataName="类别"
      pageName="category"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'category',

  components: {
    PageSearch,
    PageContent
  },
  setup() {
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
