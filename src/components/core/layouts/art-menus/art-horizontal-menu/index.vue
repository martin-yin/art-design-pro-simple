<!-- 水平菜单 -->
<template>
  <div class="top-menu">
    <el-menu
      :ellipsis="true"
      class="el-menu-popper-demo"
      mode="horizontal"
      :default-active="routerPath"
      text-color="var(--art-text-gray-700)"
      :popper-offset="16"
      :style="{ width: width + 'px' }"
      background-color="transparent"
    >
      <HorizontalSubmenu v-for="item in filteredMenuItems" :key="item.id" :item="item" :isMobile="false" :level="0" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { MenuListType } from '@/types/menu'

const route = useRoute()

const props = defineProps({
  list: {
    type: [Array] as PropType<MenuListType[]>,
    default: () => []
  },
  width: {
    type: Number,
    default: 500
  }
})

const filteredMenuItems = computed(() => {
  return props.list.filter((item) => !item.meta.isHide)
})

const routerPath = computed(() => {
  const { meta, path } = route

  if (meta.activeMenu) {
    return meta.activeMenu as string
  }

  return path
})
</script>

<style lang="scss" scoped>
:deep(.el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title) {
  border: 0 !important;
}

.top-menu {
  .el-menu {
    border: none;
  }
}

@media only screen and (max-width: $device-notebook) {
  .top-menu {
    .el-menu {
      width: 38vw !important;
    }
  }
}
</style>
