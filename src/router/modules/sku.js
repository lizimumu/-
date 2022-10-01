import Layout from '@/layout'
export default
{
  path: '/sku',
  name: 'Sku',
  // redirect: '/business',
  component: Layout,
  meta: { title: '商品管理', icon: 'shangpin' },
  children: [{
    path: 'sku-class',
    name: 'Sku-class',
    component: () => import('@/views/sku/components/sku-class'),
    meta: { title: '商品类型' }
  },
  {
    path: 'sku',
    name: 'SKU',
    component: () => import('@/views/sku/components/sku'),
    meta: { title: '商品管理' }
  }]
}
