<template>
  <!-- element icon -->
  <el-icon :size="14" v-if="icon.includes('el-icon')" class="sub-el-icon">
    <component :is="elIconHandle(icon)" />
  </el-icon>
  <!-- 非 element icon -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <!-- 文本 -->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import {} from 'vue'
import { generateTitle } from '@/utils/i18n'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
// 处理el图标
const elIconHandle = (icon) => {
  return icon.slice(icon.lastIndexOf('-') + 1, icon.length)
}
</script>

<style lang="scss" scoped></style>
