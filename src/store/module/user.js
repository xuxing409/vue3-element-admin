import { login as loginRequest } from '@/api/sys'
import { defineStore } from 'pinia'
import md5 from 'md5'
import { ref } from 'vue'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
// {
//   state: () => ({}),
//   actions: {
//     /**
//      * 登录请求动作
//      */
//     login(context, userInfo) {
//       const { username, password } = userInfo
//       return new Promise((resolve, reject) => {
//         login({
//           username,
//           password: md5(password)
//         })
//           .then((data) => {
//             resolve(data)
//           })
//           .catch((err) => {
//             reject(err)
//           })
//       })
//     }
//   }
// }

const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const token = ref(getItem(TOKEN))

  const setToken = (tokenStr) => {
    token.value = tokenStr
    setItem(TOKEN, tokenStr)
  }

  // 获取token
  const getToken = () => {
    return token.value
  }
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
          router.push('/')
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  return { getToken, userInfo, login }
})

export default useUserStore
