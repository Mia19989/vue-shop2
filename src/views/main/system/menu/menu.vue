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
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :modelConfig="modelConfig"
      pageName="menu"
      :defaultInfo="defaultInfo"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'

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

    const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
      usePageModel()

    return {
      contentTableConfig,
      searchFromConfig,
      modelConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      pageModelRef,
      defaultInfo,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
