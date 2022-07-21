<template>
  <div id="guide-hamburger" class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import appStore from '@/stores'
const { sidebarOpened } = storeToRefs(appStore.useAppStore)
const { triggerSidebarOpened } = appStore.useAppStore

const toggleClick = () => {
  triggerSidebarOpened()
}

const icon = computed(() => {
  return sidebarOpened.value ? 'hamburger-opened' : 'hamburger-closed'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
