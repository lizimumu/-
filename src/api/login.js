import request from '@/utils/request'
/**
 *
 * @param {Object} data 用户账号和密码,验证码
 */
export function login(data) {
  return request({
    url: '/user-service/user/login',
    method: 'POST',
    data
  })
}
// 图片验证码随机数
export function getImgCode(num) {
  return request({
    url: `/user-service/user/imageCode/${num}`,
    method: 'GET'

  })
}
