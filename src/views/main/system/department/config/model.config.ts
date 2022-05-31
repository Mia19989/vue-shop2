import { IFormConfig } from '@/base-ui/form'
export const modelConfig: IFormConfig = {
  title: '新建部门',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称',
      placeholder: '请输入部门名称',
      rules: [{ required: true }]
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导',
      placeholder: '请输入部门领导',
      rules: [{ required: true }]
    },
    {
      field: 'parentId',
      type: 'select',
      label: '上级部门',
      placeholder: '请选择上级部门',
      options: []
    }
  ],
  itemStyle: {},

  colLayout: {
    span: 24
  }
}
