import { MenuListType } from '@/types/menu'
import { WEB_LINKS } from '@/utils/links'
import { Layout } from '../routesAlias'

export const helpRoutes: MenuListType[] = [
  {
    id: 12,
    name: '',
    path: '',
    component: Layout,
    meta: {
      title: '帮助中心',
      icon: '&#xe719;',
      keepAlive: false
    },
    children: [
      {
        id: 1101,
        path: '',
        name: 'Document',
        meta: {
          title: '官方文档',
          link: WEB_LINKS.DOCS,
          isIframe: false,
          keepAlive: false
        }
      }
    ]
  }
]
