import axios from 'axios'
import store from '@/store'
import router from '@/router'

const Timeout = 3600 /* s */
// 封装函数对比token是不是超时
const IsCheckTimeOut = () => {
  const currentTime = new Date().getTime() /* 时间2,接口调用的时间 */
  const timeStamp = (currentTime - store.getters.hrsaaTime) / 1000 /* s */
  return timeStamp > Timeout /* true说明超时 */
}
// 通过axios 创建实例 了另一个axios 出来
// console.log(process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, /* 基础地址 */
  timeout: 5000
})
// !请求拦截器

service.interceptors.request.use(config => {
  // console.log(store)
  // console.log(config)
  if (store.getters.token) {
  // 如果有token调佣函数判断 是不是超时
    if (IsCheckTimeOut()) {
      // console.log(666)
      store.commit('user/REMOVE_TOKEN')
      router.push('/login')
    }
    config.headers.Authorization = store.getters.token
  }
  return config
}, errors => {
  return Promise.reject(errors)
})
export default service
