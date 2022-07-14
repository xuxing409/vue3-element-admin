import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * 公开路由表
 */
const publicRoutes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router