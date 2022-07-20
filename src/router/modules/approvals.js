// 导出员工的路由规则

import Layout from '@/layout'

export default {
  path: '/approvals', // 路径
  name: 'approvals',
  component: Layout,
  // 配置二级路由
  children: [{
    // path 什么都不写的时候，表示该路由为当前二级路由的默认路由
    path: '',
    component: () => import('@/views/approvals'),
    // meta 元信息 描述
    meta: {
      // 左侧导航会读取我们的路由里meta的title作为显示菜单名称
      title: "审批",
      icon: 'tree-table'
    }
  }]

}
