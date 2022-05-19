import { useStore } from '@/store'

// 验证是否有按钮权限
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  // 需要验证的是否有权限的按钮
  const verifyPermisson = `system:${pageName}:${handleName}`
  // 返回boolean值 有无按钮权限 !!两次boolean转换操作
  return !!permissions.find((item) => item === verifyPermisson)
}
