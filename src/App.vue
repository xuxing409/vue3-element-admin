<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import appStore from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const { language } = storeToRefs(appStore.useAppStore)

const locale = computed(() => (language.value === 'zh' ? zhCn : en))
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */
</style>
