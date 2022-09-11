import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { token }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${token.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request
