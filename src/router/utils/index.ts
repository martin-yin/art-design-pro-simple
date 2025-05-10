/**
 * @description 路由守卫辅助函数
 */
import { RouteLocationNormalized } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

import { useSettingStore } from '@/store/modules/setting'

import AppConfig from '@/config'

/**
 * @description 根据路由元信息设置系统主题
 * @param to 当前路由对象
 */
export const setSystemTheme = (to: RouteLocationNormalized): void => {
  if (to.meta.setTheme) {
    useTheme().switchThemeStyles(useSettingStore().systemThemeType)
  }
}

/**
 * @description 设置页面标题，根据路由元信息和系统信息拼接标题
 * @param to 当前路由对象
 */
export const setPageTitle = (to: RouteLocationNormalized): void => {
  const { title } = to.meta
  if (title) {
    setTimeout(() => {
      document.title = `${String(title)} - ${AppConfig.systemInfo.name}`
    }, 150)
  }
}
