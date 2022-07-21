<template>
  <div
    class="app-wrapper"
    :class="[sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左侧 menu -->
    <sidebar
      class="sidebar-container"
      id="guide-sidebar"
      :style="{ backgroundColor: cssVar.menuBg }"
    />
    <!-- 顶部 navbar -->
    <div class="main-container">
      <!-- 顶部 navbar -->
      <div class="fixed-header">
        <navbar />
        <!-- tag -->
        <tags-view id="guide-tags" />
      </div>

      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import appStore from '@/stores'

import Navbar from './components/Navbar.vue'
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.vue'
import TagsView from '@/components/TagsView/index.vue'
// 折叠状态
const { sidebarOpened } = storeToRefs(appStore.useAppStore)
const { cssVar } = storeToRefs(appStore.useThemeStore)
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.module.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
/* 展开 */
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sidebarDuration};
}

/* 折叠后 */
.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
