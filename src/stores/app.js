import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { lang } from '@/constant'
const useAppStore = defineStore('app', () => {
  const sidebarOpened = ref(true)
  const language = ref(getItem(lang) || 'zh')

  const triggerSidebarOpened = (state) => {
    sidebarOpened.value = !sidebarOpened.value
  }
  const setLanguage = (newLanguage) => {
    setItem(lang, newLanguage)
    language.value = newLanguage
  }
  return { sidebarOpened, language, triggerSidebarOpened, setLanguage }
})

export default useAppStore
