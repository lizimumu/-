import Layout from '@/layout'
export default
{
  path: '/task',
  name: 'Task',
  // redirect: '/business',
  component: Layout,
  meta: { title: '工单管理', icon: 'gongdan' },
  children: [{
    path: 'business',
    name: 'Business',
    component: () => import('@/views/task/components/business.vue'),
    meta: { title: '运营工单' }
  },
  {
    path: 'operation',
    name: 'Operation',
    component: () => import('@/views/task/components/opreation.vue'),
    meta: { title: '运维工单' }
  }]
}
