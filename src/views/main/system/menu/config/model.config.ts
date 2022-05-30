import { IFormConfig } from '@/base-ui/form'
export const modelConfig: IFormConfig = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      field: 'type',
      type: 'input',
      label: '类型',
      placeholder: '请输入类型'
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单url',
      placeholder: '请输入菜单url'
    },
    {
      field: 'icon',
      type: 'input',
      label: '菜单icon',
      placeholder: '请输入菜单icon'
    }
  ],
  itemStyle: {},

  colLayout: {
    span: 24
  }
}
