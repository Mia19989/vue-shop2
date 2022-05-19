export const contentTableConfig = {
  // 表单头部 标题
  title: '菜单列表',

  // userList 属性配置
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '140' },
    { prop: 'type', label: '类型', minWidth: '60' },
    { prop: 'url', label: '菜单url', minWidth: '100' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '180', slotName: 'handler' }
  ],

  // 是否显示前面的序号列
  showIndexColumn: false,

  // 是否设置显示 选择多行
  showSelectColumn: false,

  // 是否展示树形数据 属性设置
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },

  // 是否显示分页栏
  showFooter: false
}
