<template>
  <!-- 支持渲染多级 子menu 菜单 -->
  <el-sub-menu
    v-if="route.children && route.children.length > 0"
    :index="route.path"
  >
    <!-- 图标 文本-->
    <template #title>
      <menu-item :title="route.meta.title" :icon="route.meta.icon" />
    </template>
    <!-- 循环递归渲染 -->
    <sidebar-item v-for="item in route.children" :key="item.path" :route="item">
    </sidebar-item>
  </el-sub-menu>
  <!-- 渲染 item 项 -->
  <el-menu-item v-else :index="route.path">
    <menu-item :title="route.meta.title" :icon="route.meta.icon" />
  </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem.vue'
import { } from 'vue'

defineProps({
  route: {
    type: Object,
    required: true
  }
})
// // 处理el图标
// const elIconHandle = (icon) => {
//   return icon.slice(icon.lastIndexOf('-') + 1, icon.length)
// }
</script>

<style lang="scss" scoped></style>
