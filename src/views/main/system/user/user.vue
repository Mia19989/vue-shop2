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
      dataName="用户"
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
      :modelConfig="modelConfigRef"
      ref="pageModelRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

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
  name: 'users',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },

  setup() {
    // 方法封装到hooks
    const [pageContentRef, handleQueryClick, handleResetClick] = usePageSearch()

    // page-model相关的hook逻辑
    // 新建 显示密码formItem
    const newBtnCb = () => {
      // 修改model配置里的密码的isHidden属性
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    // 编辑 不显示formItem
    const editBtnCb = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const store = useStore()
    // 动态添加部门和角色列表 -> computed监听vuex里的数据的改变
    // 发生改变时 重新执行computed里的getter函数
    // model配置文件中formItems里 department和role的options
    const modelConfigRef = computed(() => {
      // computed实际返回的是一个ref对象
      const departItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )

      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )

      departItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })

      return modelConfig
    })

    const [pageModelRef, defaultInfo, handleNewClick, handleEditClick] =
      usePageModel(newBtnCb, editBtnCb)

    return {
      // 表单属性配置
      searchFromConfig,
      // table表格属性配置
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick,
      pageModelRef,
      defaultInfo,
      handleNewClick,
      handleEditClick,
      modelConfigRef
    }
  }
})
</script>

<style scoped lang="less"></style>
