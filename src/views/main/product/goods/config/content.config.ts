export const contentTableConfig = {
  // 表单头部 标题
  title: '商品列表',

  // userList 属性配置
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '100' },
    { prop: 'desc', label: '商品描述', minWidth: '100' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'oldPrice', label: '原价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '现价格', minWidth: '80', slotName: 'newPrice' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'address', label: '地址', minWidth: '80' },
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
