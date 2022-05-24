import { ILoginState } from './login/type'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'
// 规范state类型
export interface IRootState {
  name: string
  age: number
  // 所有的部门
  entireDepartment: any[]
  // 所有的角色
  entireRole: any[]
  // 所有菜单
  entireMenu: any[]
}

// 多个类型的封装
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}

// 自定义store类型
export type IStoreType = IRootState & IRootWithModule
