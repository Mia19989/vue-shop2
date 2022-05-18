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
      label: '用户名',
      placeholder: '请填写用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请填写真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '手机号',
      placeholder: '请填写手机号'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        {
          title: '启用',
          value: '1'
        },
        {
          title: '禁用',
          value: '0'
        }
      ]
    },
    {
      field: 'createAt',
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

  labelWidth: '120px',

  itemStyle: {
    padding: '10px 20px'
  },

  colLayout: {
    span: 8
  }
}
