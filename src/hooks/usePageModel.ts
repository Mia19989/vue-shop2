import { ref } from 'vue'
import PageModel from '@/components/page-model'

export function usePageModel() {
  // 方便拿到page-model中的属性
  const pageModelRef = ref<InstanceType<typeof PageModel>>()

  const defaultInfo = ref({})

  // 点击新建 编辑按钮 显示对话框
  const handleNewClick = () => {
    // 对话框destroy-on-close属性 销毁的是对话框 编辑操作中的defaultInfo的值并没有销毁
    // 手动清空defaultInfo
    defaultInfo.value = {}
    // 显示page-model中的对话框
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
  }

  //
  const handleEditClick = (item: any) => {
    // page-content中的内容 显示到对话框上
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
  }

  return [pageModelRef, defaultInfo, handleNewClick, handleEditClick]
}
