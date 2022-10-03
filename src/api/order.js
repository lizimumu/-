import request from '@/utils/request'
export const searchOrderAPI = (params) => {
  return request({
    url: 'order-service/order/search',
    params
  })
}
