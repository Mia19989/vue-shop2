// 规定IFormItem类型
type IFormType = 'input' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  type: IFormType
  // 标签文本 必填
  label: string
  // 检验规则 选填
  rules?: any[]
  // 提示 选填
  placeholder?: any
  options?: any[]
  otherOptions?: any
  // 双向绑定的内容区域
  field: string
  // 这个表单项是否隐藏
  isHidden?: boolean
}

export interface IFormConfig {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
