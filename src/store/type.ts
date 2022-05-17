import { ILoginState } from './login/type'
import { ISystemState } from './main/system/types'
// 规范state类型
export interface IRootState {
  name: string
  age: number
}

// 多个类型的封装
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
}

// 自定义store类型
export type IStoreType = IRootState & IRootWithModule
