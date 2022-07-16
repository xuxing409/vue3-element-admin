<template>
  <el-menu
    :collapse="!sidebarOpened"
    :default-active="activeMenu"
    :unique-opened="true"
    :background-color="cssVar.menuBg"
    :text-color="cssVar.menuText"
    :active-text-color="cssVar.menuActiveText"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import SidebarItem from './SidebarItem.vue'

import { storeToRefs } from 'pinia'
import appStore from '@/stores'

// 根据路由表生成menu
const router = useRouter()
const routes = computed(() => {
  const fRoutes = filterRoutes(router.getRoutes())
  return generateMenus(fRoutes)
})
// 默认激活 根据当前route拿到path 绑定到默认路由上
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})

// 处理主题
const { cssVar } = storeToRefs(appStore.useThemeStore)

// 折叠
const { sidebarOpened } = storeToRefs(appStore.useAppStore)
</script>

<style lang="scss" scoped></style>
