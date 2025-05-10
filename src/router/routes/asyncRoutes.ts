import { dashboardRoutes } from '../modules/dashboard'
import { userRoutes } from '../modules/user'
import { widgetsRoutes } from '../modules/widgets'
import { helpRoutes } from '../modules/help'

/**
 * 菜单列表、异步路由
 *
 * 支持两种模式:
 * 1. 前端静态配置 - 直接使用本文件中定义的路由配置
 * 2. 后端动态配置 - 后端返回菜单数据，前端解析生成路由
 *
 * 菜单标题（title）:
 * 可以是 i18n 的 key，也可以是字符串，比如：'用户列表'
 */
export const asyncRoutes = [...dashboardRoutes, ...userRoutes, ...widgetsRoutes, ...helpRoutes]
