import useUserStore from './user'
const appStore = {}

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.useUserStore = useUserStore()
}

export default appStore
