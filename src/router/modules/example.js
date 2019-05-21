import Layout from '@/layout'
const example = {
  path: '/example',
  component: Layout,
  redirect: '/example/table1',
  name: 'Example',
  meta: { title: '示例', icon: 'example' },
  children: [
    {
      path: 'table1',
      component: () => import('@/views/example/table/table1/index'),
      name: 'Table1',
      meta: { title: 'Table1-simple', icon: 'table' }
    },
    {
      path: 'table2',
      component: () => import('@/views/example/table/table2/index'),
      name: 'Table2',
      meta: { title: 'Table2-父子通信', icon: 'table' }
    },
    {
      path: 'table3',
      component: () => import('@/views/example/table/table3/index'),
      name: 'Table3',
      meta: { title: '封装dialog及嵌套', icon: 'table' }
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/example/tree/index'),
      meta: { title: 'Tree', icon: 'tree' }
    }
  ]
}

export default example

