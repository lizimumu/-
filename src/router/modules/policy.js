import Layout from '@/layout'
export default
{
  path: '/policy',
  name: 'Policy',
  // redirect: '/business',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/policy/components/index.vue'),
    meta: { title: '策略商管理', icon: 'celue' }
  }
  ]
}
