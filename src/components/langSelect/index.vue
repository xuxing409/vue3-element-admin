<template>
  <el-dropdown
    class="international"
    trigger="click"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <svg-icon icon="language"></svg-icon>
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"
          >中文</el-dropdown-item
        >
        <el-dropdown-item :disabled="language === 'en'" command="en"
          >English</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { defineProps } from 'vue'
import appStore from '@/stores'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

defineProps({
  // 默认主题
  effect: {
    type: String,
    default: 'dark',
    validator: (value) => {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
const { language } = storeToRefs(appStore.useAppStore)
const { setLanguage } = appStore.useAppStore

const i18n = useI18n()
// 切换语言
const handleSetLanguage = (lang) => {
  // 切换i18n的locale
  i18n.locale.value = lang
  // 修改pinia 保存的language
  setLanguage(lang)

  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style lang="scss" scoped></style>
