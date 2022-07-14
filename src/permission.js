import { storeToRefs } from 'pinia'
import router from '@/router'
import appStore from '@/stores'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 * @param {*} to 到哪里去
 * @param {*} from 从哪里来
 * @param {*} next 是否放行?
 * @returns
 */
router.beforeEach(async (to, from, next) => {
  const { token, hasUserInfo } = storeToRefs(appStore.useUserStore)
  const { getUserInfo } = appStore.useUserStore

  if (token.value) {
    // 1.用户已登录，则不允许进入login
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!hasUserInfo.value) {
        await getUserInfo()
      }
      next()
    }
  } else {
    // 2.用户未登录，则只允许进入login
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
