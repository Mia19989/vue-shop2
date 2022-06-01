<template>
  <div class="department">
    <page-search
      :searchFromConfig="searchFromConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="department"
      dataName="部门"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :modelConfig="modelConfigRef"
      pageName="department"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'

import { useStore } from '@/store'

export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },

  setup() {
    const store = useStore()

    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    const [pageModelRef, handleNewClick, handleEditClick] = usePageModel()

    const modelConfigRef = computed(() => {
      const parentIdItem = modelConfig.formItems?.find(
        (item) => item.field === 'parentId'
      )
      parentIdItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modelConfig
    })

    return {
      searchFromConfig,
      contentTableConfig,
      modelConfigRef,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      pageModelRef,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped></style>
