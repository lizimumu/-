import request from '@/utils/request'
export const getPolicyListAPI = (params) => {
  return request({
    url: 'vm-service/policy/search',
    params
  })
}
