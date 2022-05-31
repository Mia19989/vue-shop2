import { IFormConfig } from '@/base-ui/form'
// 表单属性配置
export const searchFromConfig: IFormConfig = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      type: 'input',
      label: '分类名称',
      placeholder: '请填写分类名称'
    }
  ],

  labelWidth: '120px',

  itemStyle: {
    padding: '10px 20px'
  },

  colLayout: {
    span: 8
  }
}
