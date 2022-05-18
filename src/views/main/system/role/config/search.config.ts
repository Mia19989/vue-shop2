import { IFormConfig } from '@/base-ui/form'
// 表单属性配置
export const searchFromConfig: IFormConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请填写用户名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建的时间',
      // placeholder: '请选择创建的时间范围'
      otherOptions: {
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        // daterange 可以选择的时间范围
        type: 'daterange'
      }
    }
  ],

  labelWidth: '120px'
}
