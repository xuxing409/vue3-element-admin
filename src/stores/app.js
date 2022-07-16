import { defineStore } from 'pinia'
import { ref } from 'vue'
const useAppStore = defineStore('app', () => {
  const sidebarOpened = ref(true)

  const triggerSidebarOpened = (state) => {
    sidebarOpened.value = !sidebarOpened.value
  }
  return { sidebarOpened, triggerSidebarOpened }
})

export default useAppStore
