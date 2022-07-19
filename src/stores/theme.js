import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import variablesModule from '@/styles/variables.module.scss'
import { setItem, getItem } from '@/utils/storage'
import { DEFAULT_COLOR, MAIN_COLOR } from '@/constant'
import { generateColors } from '@/utils/theme.js'

const useThemeStore = defineStore('theme', () => {
  const variables = ref(variablesModule)
  // 自定义的主题色包
  const cssVar = computed(() => ({
    ...variables.value,
    ...generateColors(getItem(MAIN_COLOR))
  }))

  const mainColor = ref(getItem(MAIN_COLOR) || DEFAULT_COLOR)

  // 设置主题色
  const setMainColor = (newColor) => {
    mainColor.value = newColor
    // 改变variables的值,使得 cssVar的依赖发生改变而重新计算主题色
    variables.value.menuBg = newColor
    setItem(MAIN_COLOR, newColor)
  }
  return { cssVar, mainColor, setMainColor }
})

export default useThemeStore
