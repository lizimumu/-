import request from '@/utils/request'
/**
 *搜索合作商
 * @param {Number} pageIndex
 * @param {Number} pageSize 条数
 * @param {String} name
 * @returns
 */
export function CooperativeQuotientSearchAPI(pageIndex, pageSize, name) {
  console.log(666)
  return request({
    url: '/user-service/partner/search',
    method: 'GET',
    params: {
      pageIndex,
      pageSize,
      name
    }
  })
}
/**
 *删除合作商接口
 * @param {*} id
 * @param {*} pageIndex
 * @param {*} pageSize
 * @param {*} name
 * @returns
 */
export function DeletePartnerAPI(id, pageIndex, pageSize, name) {
  return request({
    url: `/user-service/partner/${id}`,
    method: 'DELETE',
    data: {
      pageIndex,
      pageSize,
      name
    }
  })
}
/**
 * 重置密码
 * @param {Number} id
 * @returns
 */
export function ResetPasswordAPI(id) {
  return request({
    url: `/user-service/partner/resetPwd/${id}`,
    method: 'PUT'

  })
}
/**
 * 修改合作商
 * @param {Number} id
 * @param {*} data
 * @returns
 */
export function ModifyPartnerAPI(id, data) {
  return request({
    url: `/user-service/partner/${id}`,
    method: 'PUT',
    data

  })
}

export function NewPartnersAPI(data) {
  return request({
    url: `/user-service/partner`,
    method: 'POST',
    data

  })
}
