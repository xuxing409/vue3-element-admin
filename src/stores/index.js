import useThemeStore from './theme'
import useUserStore from './user'
import useAppStore from './app'
const appStore = {}

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.useUserStore = useUserStore()
  appStore.useThemeStore = useThemeStore()
  appStore.useAppStore = useAppStore()
}

export default appStore
