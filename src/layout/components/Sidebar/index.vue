<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        style="background-color: transparent"
        :src="imgUrl"
        shape="square"
        :size="logoHeight"
      >
      </el-avatar>
      <h1 class="logo-title" v-if="sidebarOpened">vue3-element-admin</h1>
    </div>
    <!-- el-scrollbar 处理 el-menu过长时滚动条 -->
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import imgUrl from '@/assets/logo.png'
import SidebarMenu from './SidebarMenu.vue'
import { storeToRefs } from 'pinia'
import appStore from '@/stores'
const { sidebarOpened } = storeToRefs(appStore.useAppStore)
const logoHeight = 44
</script>

<style lang="scss" scoped>
.logo-container {
  height: v-bind(logoHeight) + 'px';
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
