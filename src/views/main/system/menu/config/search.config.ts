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
      label: '菜单名称',
      placeholder: '请填写菜单名称'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建时间',
      // placeholder: '请选择创建的时间范围'
      otherOptions: {
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        // daterange 可以选择的时间范围
        type: 'daterange'
      }
    },
    {
      field: 'updateAt',
      type: 'datepicker',
      label: '更新时间',
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
