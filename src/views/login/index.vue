<template>
  <div class="login">
    <div class="left-wrap">
      <LoginLeftView></LoginLeftView>
    </div>
    <div class="right-wrap">
      <div class="top-right-wrap">
        <div class="btn theme-btn" @click="toggleTheme">
          <i class="iconfont-sys">
            {{ isDark ? '&#xe6b5;' : '&#xe725;' }}
          </i>
        </div>
      </div>
      <div class="header">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#iconsys-zhaopian-copy"></use>
        </svg>
        <h1>{{ systemName }}</h1>
      </div>
      <div class="login-wrap">
        <div class="form">
          <h3 class="title">欢迎回来</h3>
          <p class="sub-title">输入您的账号和密码登录</p>
          <el-form ref="formRef" :model="formData" :rules="rules" @keyup.enter="handleSubmit" style="margin-top: 25px">
            <el-form-item prop="username">
              <el-input placeholder="请输入账号" v-model.trim="formData.username" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                placeholder="请输入密码"
                v-model.trim="formData.password"
                type="password"
                radius="8px"
                autocomplete="off"
              />
            </el-form-item>
            <div class="drag-verify">
              <div class="drag-verify-content" :class="{ error: !isPassing && isClickPass }">
                <ArtDragVerify
                  ref="dragVerify"
                  v-model:value="isPassing"
                  :width="width < 500 ? 328 : 438"
                  text="按住滑块拖动"
                  textColor="var(--art-gray-800)"
                  successText="验证成功"
                  :progressBarBg="getCssVariable('--el-color-primary')"
                  background="var(--art-gray-200)"
                  handlerBg="var(--art-main-bg-color)"
                  @pass="onPass"
                />
              </div>
              <p class="error-text" :class="{ 'show-error-text': !isPassing && isClickPass }">请拖动滑块完成验证</p>
            </div>

            <div class="forget-password">
              <el-checkbox v-model="formData.rememberPassword">记住密码</el-checkbox>
              <router-link to="/forget-password">忘记密码</router-link>
            </div>

            <div style="margin-top: 30px">
              <el-button class="login-btn" type="primary" @click="handleSubmit" :loading="loading" v-ripple>
                登录
              </el-button>
            </div>

            <div class="footer">
              <p>
                还没有账号？
                <router-link to="/register">注册</router-link>
              </p>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppConfig from '@/config'
import { ElMessage, ElNotification } from 'element-plus'
import { useUserStore } from '@/store/modules/user'
import { HOME_PAGE } from '@/router/routesAlias'
import { ApiStatus } from '@/utils/http/status'
import { getCssVariable } from '@/utils/colors'
import { SystemThemeEnum } from '@/enums/appEnum'

import { useSettingStore } from '@/store/modules/setting'
import type { FormInstance, FormRules } from 'element-plus'

const settingStore = useSettingStore()
const { isDark, systemThemeType } = storeToRefs(settingStore)

const dragVerify = ref()

const userStore = useUserStore()
const router = useRouter()
const isPassing = ref(false)
const isClickPass = ref(false)

const systemName = AppConfig.systemInfo.name
const formRef = ref<FormInstance>()
const formData = reactive({
  username: AppConfig.systemInfo.login.username,
  password: AppConfig.systemInfo.login.password,
  rememberPassword: true
})

const rules = computed<FormRules>(() => ({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}))

const loading = ref(false)
const { width } = useWindowSize()

const onPass = () => {}

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      if (!isPassing.value) {
        isClickPass.value = true
        return
      }

      loading.value = true

      // 延时辅助函数
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

      try {
        const res = await UserService.login({
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        })

        if (res.code === ApiStatus.success && res.data) {
          // 设置 token
          userStore.setToken(res.data.accessToken)

          // 获取用户信息
          const userRes = await UserService.getUserInfo()
          if (userRes.code === ApiStatus.success) {
            userStore.setUserInfo(userRes.data)
          }

          // 设置登录状态
          userStore.setLoginStatus(true)
          // 延时辅助函数
          await delay(1000)
          // 登录成功提示
          showLoginSuccessNotice()
          // 跳转首页
          router.push(HOME_PAGE)
        } else {
          ElMessage.error(res.message)
          resetDragVerify()
        }
      } finally {
        await delay(1000)
        loading.value = false
      }
    }
  })
}

// 重置拖拽验证
const resetDragVerify = () => {
  dragVerify.value.reset()
}

// 登录成功提示
const showLoginSuccessNotice = () => {
  setTimeout(() => {
    ElNotification({
      title: '登录成功',
      type: 'success',
      showClose: true,
      duration: 2500,
      zIndex: 10000,
      offset: 40,
      message: `欢迎回来, ${systemName}!`
    })
  }, 300)
}

// 切换主题
import { useTheme } from '@/composables/useTheme'
import { UserService } from '@/api/usersApi'

const toggleTheme = () => {
  let { LIGHT, DARK } = SystemThemeEnum
  useTheme().switchThemeStyles(systemThemeType.value === LIGHT ? DARK : LIGHT)
}
</script>

<style lang="scss" scoped>
@use './index';
</style>
