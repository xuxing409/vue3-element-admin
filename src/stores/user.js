import {
  login as loginRequest,
  getUserInfo as getUserInfoRequest
} from '@/api/sys'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { ref, computed } from 'vue'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth'

const useUserStore = defineStore('user', () => {
  // ref、reactive定义的变量等价于options API中的state
  const token = ref(getItem(TOKEN))
  const userInfo = ref({})

  const setToken = (tokenStr) => {
    token.value = tokenStr
    setItem(TOKEN, tokenStr)
  }
  const setUserInfo = (data) => {
    userInfo.value = data
  }
  // 登录请求动作
  const login = (userInfo) => {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      loginRequest({
        username,
        password: md5(password)
      })
        .then((data) => {
          userInfo.value = data
          setToken(data.token)
          // 跳转
          router.push('/')
          // 保存登录时间
          setTimeStamp()
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 获取用户信息
  const getUserInfo = async (context) => {
    const res = await getUserInfoRequest()
    setUserInfo(res)
    return res
  }
  /**
   *
   * @returns true 表示用户信息已存在
   */
  const hasUserInfo = computed(() => {
    return JSON.stringify(userInfo.value) !== '{}'
  })
  /**
   * 退出登录
   */
  const logout = () => {
    userInfo.value = {}
    token.value = ''
    removeAllItem()
    // TODO: 清理权限相关
    router.push('/login')
  }
  return { token, userInfo, login, logout, getUserInfo, hasUserInfo }
})

export default useUserStore
