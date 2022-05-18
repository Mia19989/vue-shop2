import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 调用page-content 里的getPageData方法
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo)
  }

  const handleResetClick = () => {
    pageContentRef.value?.getPageData()
  }

  return [pageContentRef, handleQueryClick, handleResetClick]
}
