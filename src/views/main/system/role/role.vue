<template>
  <div class="role">
    <page-search :searchFromConfig="searchFromConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :modelConfig="modelConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'
import { modelConfig } from './config/model.config'

import { usePageModel } from '@/hooks/usePageModel'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModel
  },

  setup() {
    const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
      usePageModel()
    return {
      contentTableConfig,
      searchFromConfig,
      modelConfig,
      pageModelRef,
      defaultInfo,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
