import request from '@/utils/request'
/**
 *获取 合作商管理列表
 * @param {NUmber} num1
 * @param {Number} num2
 * @returns
 */
export function getAreaListAPI(num1, num2, name) {
  return request({
    url: `/vm-service/region/search`,
    method: 'GET',
    params: {
      pageIndex: num1,
      pageSize: num2,
      name
    }
  })
}

export function GetDetailsAPI(index, size, id) {
  return request({
    url: `/vm-service/node/search`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    params: {
      pageIndex: index,
      pageSize: size,
      regionld: id
    }
  })
}
/**
 *新增区域
 * @param {Object} data
 * @returns
 */
export function AddAreaAPI(data) {
  console.log(data)
  return request({
    url: '/vm-service/region',
    method: 'POST',
    data
  })
}
/**
 *修改区域
 * @param {Number} id
 * @param {Object} data
 * @returns
 */
export function ModifyArea(id, data) {
  return request({
    url: `/vm-service/region/${id}`,
    method: 'PUT',
    data
  })
}
export function RemoveArea(id) {
  return request({
    url: `/vm-service/region/${id}`,
    method: 'DELETE'

  })
}

