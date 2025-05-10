import { MenuListType } from '@/types/menu'
import { Layout } from '../routesAlias'

export const userRoutes: MenuListType[] = [
  {
    id: 2,
    name: 'User',
    path: '/user',
    component: Layout,
    meta: {
      title: '用户管理',
      icon: '&#xe86e;',
      keepAlive: false
    },
    children: [
      {
        id: 301,
        path: 'account',
        name: 'Account',
        component: '/user/Account',
        meta: {
          title: '账号管理',
          keepAlive: true
        }
      },
      {
        id: 302,
        path: 'department',
        name: 'Department',
        component: '/user/Department',
        meta: {
          title: '部门管理',
          keepAlive: false
        }
      },
      {
        id: 303,
        path: 'role',
        name: 'Role',
        component: '/user/Role',
        meta: {
          title: '角色权限',
          keepAlive: true
        }
      },
      {
        id: 304,
        path: 'user',
        name: 'UserCenter',
        component: '/user/User',
        meta: {
          title: '个人中心',
          isHide: true,
          keepAlive: true,
          isHideTab: true
        }
      }
    ]
  }
]
