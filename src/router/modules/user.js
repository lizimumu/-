import Layout from '@/layout'
export default
{
  path: '/user',
  name: 'User',
  // redirect: '/business',
  component: Layout,
  meta: { title: '人员管理', icon: 'renyuan' },
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/user/components/index.vue'),
    meta: { title: '人员列表' }
  },
  {
    path: 'user-task-stats',
    name: 'User-Task-Stats',
    component: () => import('@/views/user/components/user-task-stats.vue'),
    meta: { title: '人效统计' }
  }, {
    path: 'user-work',
    name: 'User-Work',
    component: () => import('@/views/user/components/user-work.vue'),
    meta: { title: '工作管理' }
  }]
}
