import Layout from '@/layout'
export default
{
  path: '/order',
  name: 'Order',
  // redirect: '/business',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/order/components/index.vue'),
    meta: { title: '订单管理', icon: 'dingdan' }
  }
  ]
}
