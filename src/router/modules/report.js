import Layout from '@/layout'
export default
{
  path: '/report',
  name: 'Report',
  // redirect: '/business',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/report/components/index.vue'),
    meta: { title: '对账统计', icon: 'duizhang' }
  }
  ]
}
