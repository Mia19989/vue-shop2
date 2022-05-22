<template>
  <div class="user">
    <page-search
      :searchFromConfig="searchFromConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
      ref="pageContentRef"
      @newBtnClick="handleNewClick"
      @editBtnClick="handleEditClick"
    >
      <template #status="scope">
        <!-- 从这一行中的数据获取enable -->
        <el-button
          :type="scope.row.enable ? 'success' : 'danger'"
          size="small"
          plain
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>

    <page-model
      :modelConfig="modelConfig"
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModel from '@/components/page-model'

import { searchFromConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modelConfig } from './config/model.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModel } from '@/hooks/usePageModel'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },

  setup() {
    // 方法封装到hooks
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()
    const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
      usePageModel()

    return {
      // 表单属性配置
      searchFromConfig,
      // table表格属性配置
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      modelConfig,
      pageModelRef,
      defaultInfo,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped lang="less"></style>
