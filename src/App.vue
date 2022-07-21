<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import appStore from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { writeNewStyle, generateNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'

// el plus语言包处理
const { language } = storeToRefs(appStore.useAppStore)
const locale = computed(() => (language.value === 'zh' ? zhCn : en))

// 处理刷新后,重新生成主题色css文件
const { mainColor } = storeToRefs(appStore.useThemeStore)
generateNewStyle(mainColor.value).then((newStyle) => writeNewStyle(newStyle))

// 处理用户信息接口国际化
const { token } = storeToRefs(appStore.useUserStore)
const { getUserInfo } = appStore.useUserStore
watchSwitchLang(() => {
  if (token.value) {
    getUserInfo()
  }
})
</script>

<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style></style>
