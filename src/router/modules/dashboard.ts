import { MenuListType } from '@/types/menu'

export const dashboardRoutes: MenuListType[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    component: '/dashboard/index',
    meta: {
      title: '控制台',
      icon: '&#xe721;',
      keepAlive: false,
      isInMainContainer: true
    }
  }
]
