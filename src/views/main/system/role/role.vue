<template>
  <div class="role">
    <page-search :searchFromConfig="searchFromConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      dataName="角色"
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
          ref="elTreeRef"
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
import { computed, defineComponent, nextTick, ref } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModel from '@/components/page-model'

import { contentTableConfig } from './config/content.config'
import { searchFromConfig } from './config/search.config'
import { modelConfig } from './config/model.config'

import { ElTree } from 'element-plus'

import { usePageModel } from '@/hooks/usePageModel'
import { mapMenuLeafKeys } from '@/utils/map-menus'

import { useStore } from '@/store'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModel
  },

  setup() {
    // el-tree设置ref属性
    const elTreeRef = ref<InstanceType<typeof ElTree>>()

    // 编辑对话框回显tree内容
    const editCbData = (item: any) => {
      // 获取准备回显的叶子结点
      const leafKeys = mapMenuLeafKeys(item.menuList)
      // 注意调用nextTick 因为elTreeRef在编辑对话框弹出的时候，还没来得及绑定tree树形控件
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys)
        console.log(leafKeys)
      })
    }
    const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
      usePageModel(undefined, editCbData)

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
      elTreeRef,
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
