import Layout from '@/layout'
export default
{
  path: '/vm',
  name: 'VM',
  // redirect: '/business',
  component: Layout,
  meta: { title: '设备管理', icon: 'shebei' },
  children: [{
    path: 'index',
    name: 'Index',
    component: () => import('@/views/vm/components/index'),
    meta: { title: '设备管理' }
  },
  {
    path: 'state',
    name: 'State',
    component: () => import('@/views/vm/components/status.vue'),
    meta: { title: '设备状态' }
  }, {
    path: 'type',
    name: 'Type',
    component: () => import('@/views/vm/components/type.vue'),
    meta: { title: '设备类型管理' }
  }]
}
