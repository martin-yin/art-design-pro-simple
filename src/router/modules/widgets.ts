import { MenuListType } from '@/types/menu'
import { Layout } from '../routesAlias'

export const widgetsRoutes: MenuListType[] = [
  {
    id: 5,
    path: '/widgets',
    name: 'Widgets',
    component: Layout,
    meta: {
      title: '组件中心',
      icon: '&#xe81a;',
      keepAlive: false
    },
    children: [
      {
        id: 503,
        path: 'icon-list',
        name: 'IconList',
        component: '/widgets/IconList',
        meta: {
          title: 'Icon 图标',
          keepAlive: true
        }
      },
      {
        id: 504,
        path: 'icon-selector',
        name: 'IconSelector',
        component: '/widgets/IconSelector',
        meta: {
          title: '图标选择器',
          keepAlive: true
        }
      },
      {
        id: 506,
        path: 'excel',
        name: 'Excel',
        component: '/widgets/Excel',
        meta: {
          title: 'Excel 导入导出',
          keepAlive: true
        }
      },
      {
        id: 509,
        path: 'wang-editor',
        name: 'WangEditor',
        component: '/widgets/WangEditor',
        meta: {
          title: '富文本编辑器',
          keepAlive: true
        }
      },
      {
        id: 510,
        path: 'watermark',
        name: 'Watermark',
        component: '/widgets/Watermark',
        meta: {
          title: '水印',
          keepAlive: true
        }
      },
      {
        id: 513,
        path: 'drag',
        name: 'Drag',
        component: '/widgets/Drag',
        meta: {
          title: '拖拽',
          keepAlive: true
        }
      }
    ]
  }
]
