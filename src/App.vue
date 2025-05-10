<template>
  <ElConfigProvider size="default" :locale="zh" :z-index="3000">
    <RouterView></RouterView>
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { useUserStore } from './store/modules/user'
import zh from 'element-plus/es/locale/lang/zh-cn'
import { initState, saveUserData } from './utils/storage'
import { UserService } from './api/usersApi'
import { ApiStatus } from './utils/http/status'
import { setThemeTransitionClass } from './utils/theme/animation'

const userStore = useUserStore()

onBeforeMount(() => {
  setThemeTransitionClass(true)
})

onMounted(() => {
  initState()
  saveUserData()
  setThemeTransitionClass(false)
  getUserInfo()
})

// 获取用户信息
const getUserInfo = async () => {
  if (userStore.isLogin) {
    const userRes = await UserService.getUserInfo()
    if (userRes.code === ApiStatus.success) {
      userStore.setUserInfo(userRes.data)
    }
  }
}
</script>
