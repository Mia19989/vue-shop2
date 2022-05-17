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
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请填写密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '喜欢的运动',
      placeholder: '请选择喜欢的运动',
      options: [
        {
          title: '篮球',
          value: 'basketball'
        },
        {
          title: '足球',
          value: 'football'
        }
      ]
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

  labelWidth: '120px',

  itemStyle: {
    padding: '10px 20px'
  },

  colLayout: {
    span: 8
  }
}
