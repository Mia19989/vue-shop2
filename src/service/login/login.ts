// 封装登录请求
import hccRequest from '../index'
import { IAccount, ILoginResult } from './type'
import { IDataType } from '../types'

// 枚举类 枚举login用到的url
enum LoginAPI {
  // 账号登录的url
  AccountLogin = '/login',
  // 请求用户信息的url
  LoginUserInfo = '/users/',
  // 请求用户菜单的url
  UserMenus = '/role/'
}

// 账号请求登录的方法
export function accountLoginRequest(account: IAccount) {
  // 返回post请求的结果
  return hccRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

// 请求用户信息
export function requestUserInfoById(id: number) {
  return hccRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

// 请求用户菜单
export function requestUserMenusByRoleId(id: number) {
  return hccRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
