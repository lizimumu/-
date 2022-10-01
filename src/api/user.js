import request from '@/utils/request'
import store from '@/store'
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
console.log(store)
export function getUserInfoAPI(id) {
  return request({
    url: `/user-service/user/${id}`,
    method: 'GET'
    // headers: {
    //   Authorization: store.getters.token
    // }
  })
}
