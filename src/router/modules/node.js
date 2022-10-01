import Layout from '@/layout'
export default
{
  path: '/node',
  name: 'Node',
  // redirect: '/business',
  component: Layout,
  meta: { title: '点位管理', icon: 'dianwei' },
  children: [{
    path: 'region',
    name: 'Region',
    component: () => import('@/views/node/components/region.vue'),
    meta: { title: '合作商管理' }
  },
  {
    path: 'node',
    name: 'Node',
    component: () => import('@/views/node/components/node.vue'),
    meta: { title: '点位管理' }
  }, {
    path: 'partner',
    name: 'Partner',
    component: () => import('@/views/node/components/partner.vue'),
    meta: { title: '合作商管理' }
  }]
}
