import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'
const useAppStore = defineStore('app', () => {
  const sidebarOpened = ref(true)
  const language = ref('')
  const tagsViewList = ref([])

  language.value = getItem(LANG) || 'zh'
  tagsViewList.value = getItem(TAGS_VIEW) || []

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
      setItem(TAGS_VIEW, tagsViewList.value)
    }
  }
  /**
   * 为指定的 tag 修改 title
   */
  const changeTagsView = ({ index, tag }) => {
    tagsViewList.value[index] = tag
    setItem(TAGS_VIEW, tagsViewList.value)
  }
  /**
   *
   * @param {type: 'other' || 'right' || 'index'} paylod
   */
  const removeTagsView = (payload) => {
    switch (payload.type) {
      case 'index':
        tagsViewList.value.splice(payload.index, 1)
        break
      case 'other':
        tagsViewList.value.splice(
          payload.index + 1,
          tagsViewList.value.length - payload.index + 1
        )
        tagsViewList.value.splice(0, payload.index)
        break
      case 'right':
        tagsViewList.value.splice(
          payload.index + 1,
          tagsViewList.value.length - payload.index + 1
        )
        break

      default:
        break
    }
    setItem(TAGS_VIEW, tagsViewList.value)
  }
  return {
    sidebarOpened,
    language,
    tagsViewList,
    triggerSidebarOpened,
    setLanguage,
    addTagsViewList,
    changeTagsView,
    removeTagsView
  }
})

export default useAppStore
