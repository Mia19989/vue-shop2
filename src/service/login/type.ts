export interface IAccount {
  // 账号
  name: string
  // 密码
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
