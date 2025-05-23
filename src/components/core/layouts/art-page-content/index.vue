<!-- 内容布局 -->
<template>
  <div class="layout-content" :style="containerStyle">
    <RouterView v-if="isRefresh && isOnline" v-slot="{ Component, route }" :style="{ minHeight: containerMinHeight }">
      <div v-if="isOpenRouteInfo === 'true'" class="route-info">
        {{ route.meta }}
      </div>

      <!-- 路由动画 -->
      <Transition :name="pageTransition" mode="out-in" appear>
        <KeepAlive :max="10" :exclude="keepAliveExclude">
          <component :is="Component" :key="route.path" v-if="route.meta.keepAlive" />
        </KeepAlive>
      </Transition>

      <Transition :name="pageTransition" mode="out-in" appear>
        <component :is="Component" :key="route.path" v-if="!route.meta.keepAlive" />
      </Transition>
    </RouterView>

    <!-- 网络状态 -->
    <ArtNetwork v-else />
  </div>
</template>

<script setup lang="ts">
import { useNetwork } from '@vueuse/core'
import { useCommon } from '@/composables/useCommon'
import { useWorktabStore } from '@/store/modules/worktab'
import { useSettingStore } from '@/store/modules/setting'

// Store refs
const { pageTransition, containerWidth, refresh } = storeToRefs(useSettingStore())
const { keepAliveExclude } = storeToRefs(useWorktabStore())

const { containerMinHeight } = useCommon()
const { isOnline } = useNetwork()

const containerStyle = computed(() => {
  return {
    maxWidth: containerWidth.value
  }
})

// State
const isRefresh = ref(true)
const isOpenRouteInfo = import.meta.env.VITE_OPEN_ROUTE_INFO

// Methods
const reload = () => {
  isRefresh.value = false
  nextTick(() => {
    isRefresh.value = true
  })
}

// Watchers
watch(refresh, reload)
</script>
