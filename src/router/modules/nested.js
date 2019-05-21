import Layout from '@/layout'
const menu1 = [
  {
    path: 'menu1-1',
    component: () => import('@/views/nested/menu1/menu1-1'),
    name: 'Menu1-1',
    meta: { title: 'Menu1-1' }
  },
  {
    path: 'menu1-2',
    component: () => import('@/views/nested/menu1/menu1-2'),
    name: 'Menu1-2',
    meta: { title: 'Menu1-2' },
    children: [
      {
        path: 'menu1-2-1',
        component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
        name: 'Menu1-2-1',
        meta: { title: 'Menu1-2-1' }
      },
      {
        path: 'menu1-2-2',
        component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
        name: 'Menu1-2-2',
        meta: { title: 'Menu1-2-2' }
      }
    ]
  },
  {
    path: 'menu1-3',
    component: () => import('@/views/nested/menu1/menu1-3'),
    name: 'Menu1-3',
    meta: { title: 'Menu1-3' }
  }
]

const nested = {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested',
  meta: {
    title: '路由嵌套',
    icon: 'nested'
  },
  children: [
    {
      path: 'menu1',
      component: () => import('@/views/nested/menu1/index'), // Parent router-view
      name: 'Menu1',
      meta: { title: 'Menu1' },
      children: menu1
    },
    {
      path: 'menu2',
      component: () => import('@/views/nested/menu2/index'),
      meta: { title: 'menu2' }
    }
  ]
}

export default nested

