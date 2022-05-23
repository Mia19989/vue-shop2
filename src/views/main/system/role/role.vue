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
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :data="menuData"
          :props="{ children: 'children', label: 'name' }"
          show-checkbox
          node-key="id"
          @check="handleCheckChange"
        />
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'
import { modelConfig } from './config/model.config'

import { usePageModel } from '@/hooks/usePageModel'

import { useStore } from '@/store'

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

    const store = useStore()
    const menuData = computed(() => store.state.entireMenu)
    const otherInfo = ref({})

    // 点击结点复选框
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      // otherInfo.value = { menuList: menuList }
      otherInfo.value = { menuList }
      // console.log(otherInfo.value)
    }

    return {
      contentTableConfig,
      searchFromConfig,
      modelConfig,
      pageModelRef,
      defaultInfo,
      handleNewClick,
      handleEditClick,
      menuData,
      otherInfo,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
