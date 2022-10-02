import request from '@/utils/request'

export function getAreaListAPI(num1, num2) {
  return request({
    url: `/vm-service/region/search`,
    method: 'GET',
    params: {
      pageIndex: num1,
      pageSize: num2
    }
  })
}

