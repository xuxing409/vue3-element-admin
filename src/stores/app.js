import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
const useAppStore = defineStore('app', () => {
  const sidebarOpened = ref(true)
  const language = ref(getItem(LANG) || 'zh')
  const tagsViewList = ref(getItem(TAGS_VIEW) || [])

  const triggerSidebarOpened = () => {
    sidebarOpened.value = !sidebarOpened.value
  }
  const setLanguage = (newLanguage) => {
    setItem(LANG, newLanguage)
    language.value = newLanguage
  }
  const addTagsViewList = (tag) => {
    // 处理重复
    const isFind = tagsViewList.value.find((item) => {
      return item.path === tag.path
    })
    if (!isFind) {
      tagsViewList.value.push(tag)
      // 数据持久化
      setItem(TAGS_VIEW, tagsViewList)
    }
  }
  return {
    sidebarOpened,
    language,
    tagsViewList,
    triggerSidebarOpened,
    setLanguage,
    addTagsViewList
  }
})

export default useAppStore
