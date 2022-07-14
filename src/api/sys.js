import request from '@/utils/request.js'
/**
 * 登录
 */

export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * return promise
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
