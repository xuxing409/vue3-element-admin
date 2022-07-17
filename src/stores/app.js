import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { LANG } from '@/constant'
const useAppStore = defineStore('app', () => {
  const sidebarOpened = ref(true)
  const language = ref(getItem(LANG) || 'zh')

  const triggerSidebarOpened = () => {
    sidebarOpened.value = !sidebarOpened.value
  }
  const setLanguage = (newLanguage) => {
    setItem(LANG, newLanguage)
    language.value = newLanguage
  }
  return { sidebarOpened, language, triggerSidebarOpened, setLanguage }
})

export default useAppStore
