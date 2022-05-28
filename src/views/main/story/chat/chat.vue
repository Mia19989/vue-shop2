<template>
  <div class="chat">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>

    <div class="btns">
      <el-button type="primary" @click="handleSubmitClick">提交</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref, shallowRef } from 'vue'

import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig, IDomEditor } from '@wangeditor/editor'
import { SlateDescendant } from '@wangeditor/editor'

declare module '@wangeditor/editor' {
  // 扩展 Text
  interface SlateText {
    text: string
  }

  // 扩展 Element
  interface SlateElement {
    type: string
    children: SlateDescendant[]
  }
}

export default defineComponent({
  name: 'chat',
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref()

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //   }, 1500)
    // })

    const toolbarConfig = {}
    const editorConfig: Partial<IEditorConfig> = {
      placeholder: '请输入内容...'
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: IDomEditor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    // 监听提交事件
    // 发送请求 创建新的story
    const handleSubmitClick = () => {
      console.log('点击提交，提交内容是：', valueHtml.value)
    }

    return {
      editorRef,
      valueHtml,
      mode: 'simple', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleSubmitClick
    }
  }
})
</script>

<style scoped lang="less">
.btns {
  display: flex;
  justify-content: right;
  margin: 10px;
}
</style>
