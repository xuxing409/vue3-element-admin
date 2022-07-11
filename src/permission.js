import router from '@/router'
import useStore from '@/store'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 * @param {*} to 到哪里去
 * @param {*} from 从哪里来
 * @param {*} next 是否放行?
 * @returns
 */
router.beforeEach((to, from, next) => {
  const { user } = useStore()
  // 1.用户已登录，则不允许进入login
  // 2.用户未登录，则只允许进入login
  if (user.getToken()) {
    // 1.用户已登录，则不允许进入login
    if (to.path === 'login') {
      next('/')
    } else {
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
