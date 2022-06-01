<template>
  <div class="overview">
    <hcc-card title="关于">
      <div class="c-left">
        Vue3Admin 是基于 Vue3、Vuex、VueRouter、Vite、 ElementPlus
        、TypeScript、Echart5 等后台系统解决方案。
      </div>
    </hcc-card>
    <hcc-card title="技术栈">
      <hcc-text-link :textArrs="technologyStacks"></hcc-text-link>
      <hcc-descriptions
        title="生产环境依赖"
        :column="2"
        :tableData="dependencies"
      ></hcc-descriptions>
      <hcc-descriptions
        title="开发环境依赖"
        :column="2"
        :tableData="devDependencies"
      ></hcc-descriptions>
    </hcc-card>

    <hcc-card title="项目规范">
      <hcc-descriptions
        title="文件命名规范"
        :column="1"
        :tableData="[
          { name: '文件夹', description: '统一小写, 多个单词使用-分割' },
          {
            name: '文件(.ts .vue .json .d.ts)',
            description: '统一小写, 多个单词使用-分割'
          }
        ]"
      />
      <hcc-descriptions
        title="编写组件规范"
        :column="1"
        :tableData="[
          { name: '组件的文件', description: '统一小写, 多个单词使用-分割' },
          {
            name: '组件的目录结构',
            description:
              '例如 button 组件：button/src/index.vue, 统一在button/index.ts导出'
          },
          {
            name: '组件导包顺序',
            description:
              '导vue技术栈的包 , 导第三方的工具函数 , 导本地的组件, 导本地的工具函数'
          },
          { name: '组件的名称', description: '统一大写开头，驼峰命名' },
          {
            name: '组件属性顺序',
            description: 'name, components, props, emits, setup ...'
          },
          {
            name: 'template标签',
            description: '小写加 - ( 例如：<case-panel/> )'
          },
          {
            name: 'template标签属性顺序',
            description: 'v-if , v-for , ref, class, style, ... ,事件'
          },
          {
            name: '组件的props',
            description: '小写开头，驼峰命名，必须编写类型默认值'
          },
          {
            name: '组件的样式',
            description:
              '作用域：scoped, lang = scss / less  ; 类名：统一小写, 多个单词使用-分割'
          }
        ]"
      />
    </hcc-card>

    <hcc-card title="Git提交规范">
      <hcc-descriptions
        :column="1"
        :tableData="[
          { name: 'add 操作', description: 'git add ' },
          { name: 'commit 操作', description: 'yarn commit ' },
          { name: 'pull 操作', description: 'git pull ' },
          { name: 'push 操作', description: 'git push ' }
        ]"
      />
    </hcc-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import HccCard from '@/base-ui/card'
import HccTextLink from '@/base-ui/text-link'
import HccDescriptions from '@/base-ui/descriptions'

import { technologyStacks, dependencies, devDependencies } from './config'

export default defineComponent({
  name: 'overview',

  components: {
    HccCard,
    HccTextLink,
    HccDescriptions
  },

  setup() {
    return {
      technologyStacks,
      dependencies,
      devDependencies
    }
  }
})
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
  &:deep(.el-card__header span) {
    font-weight: 700;
  }
}
.c-left {
  text-align: left;
}
</style>
