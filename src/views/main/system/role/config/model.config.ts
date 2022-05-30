import { IFormConfig } from '@/base-ui/form'
export const modelConfig: IFormConfig = {
  title: '新建角色',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  itemStyle: {},

  colLayout: {
    span: 24
  }
}
