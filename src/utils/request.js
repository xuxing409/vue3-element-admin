import axios from 'axios'
import { ElMessage } from 'element-plus'
import md5 from 'md5'
const apiBaseUrl = import.meta.env.VITE_BASE_URL

const service = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time
    // 在这个位置需要统一的去注入token
    // if (store.getters.token) {
    //   // 如果token存在 注入token
    //   config.headers.Authorization = `Bearer ${store.getters.token}`
    //   if (isCheckTimeout()) {
    //     // 登出操作
    //     store.dispatch('user/logout')
    //     return Promise.reject(new Error('token 失效'))
    //   }
    // }
    // // 配置接口国际化
    // config.headers['Accept-Language'] = store.getters.language
    return config // 必须返回配置
  },
  (error) => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  // 请求成功
  (response) => {
    const { success, message, data } = response.data
    // 判断当前请求是否成功
    if (success) {
      // 成功返回解析后的数据
      return data
    } else {
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }

    // 失败(请求成功，业务失败)，消息提示
  },
  // 请求失败
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
// /**
//  * 返回 Icode 的实现
//  */
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}
export default service
