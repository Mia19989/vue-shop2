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
      label: '部门名称',
      placeholder: '请填写部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导',
      placeholder: '请填写真实姓名'
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
