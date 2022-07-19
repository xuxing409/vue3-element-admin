<template>
  <div @click="onToggle">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
// 是否全屏
const isFullscreen = ref(false)
const onToggle = () => {
  screenfull.toggle()
}
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
// 绑定监听
onMounted(() => {
  screenfull.on('change', change)
})
// 取消监听
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>

<style lang="scss" scoped></style>
