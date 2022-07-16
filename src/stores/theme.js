import { defineStore } from 'pinia'
import { computed } from 'vue'
import variables from '@/styles/variables.module.scss'
const useThemeStore = defineStore('theme', () => {
  const cssVar = computed(() => variables)

  return { cssVar }
})

export default useThemeStore
