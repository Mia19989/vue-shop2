export const contentTableConfig = {
  // 表单头部 标题
  title: '类别列表',

  // userList 属性配置
  propList: [
    { prop: 'name', label: '类别名称', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '230',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '230',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '180', slotName: 'handler' }
  ],

  // 是否显示前面的序号列
  showIndexColumn: true,

  // 是否设置显示 选择多行
  showSelectColumn: true
}