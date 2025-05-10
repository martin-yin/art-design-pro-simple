import { RouteRecordRaw } from 'vue-router'
import Home from '@views/layout/index.vue'
import { HOME_PAGE } from '../routesAlias'

/** 扩展的路由配置类型 */
export type AppRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
}

/** 静态路由配置 */
export const staticRoutes: AppRouteRecordRaw[] = [
  { path: '/', redirect: HOME_PAGE },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/login/index.vue'),
    meta: { title: '登录', isHideTab: true, setTheme: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@views/register/index.vue'),
    meta: { title: '注册', isHideTab: true, noLogin: true, setTheme: true }
  },
  {
    path: '/forget-password',
    name: 'ForgetPassword',
    component: () => import('@views/forget-password/index.vue'),
    meta: { title: '忘记密码', isHideTab: true, noLogin: true, setTheme: true }
  },
  {
    path: '/exception',
    component: Home,
    name: 'Exception',
    meta: { title: '异常页面' },
    children: [
      {
        path: '/exception/403',
        name: 'Exception403',
        component: () => import('@/views/exception/403.vue'),
        meta: { title: '403' }
      },
      {
        path: '/:catchAll(.*)',
        name: 'Exception404',
        component: () => import('@views/exception/404.vue'),
        meta: { title: '404' }
      },
      {
        path: '/exception/500',
        name: 'Exception500',
        component: () => import('@views/exception/500.vue'),
        meta: { title: '500' }
      }
    ]
  },
  {
    path: '/outside',
    component: Home,
    name: 'Outside',
    meta: { title: '内嵌页面' },
    children: [
      {
        path: '/outside/iframe/:path',
        name: 'Iframe',
        component: () => import('@/views/outside/Iframe.vue'),
        meta: { title: 'iframe' }
      }
    ]
  }
]
