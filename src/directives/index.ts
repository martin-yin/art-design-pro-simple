import type { App } from 'vue'
import { setupPermissionDirective } from './permission'
import { setupRippleDirective } from './ripple'

export function setupGlobDirectives(app: App) {
  setupPermissionDirective(app) // 权限指令
  setupRippleDirective(app) // 水波纹指令
}
