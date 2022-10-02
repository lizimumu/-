import request from '@/utils/request'
/**
 * 根据策略名称搜索策略
 * @param {String} params 策略方案名称
 * @returns
 */
export const getPolicyListAPI = (params) => {
  return request({
    url: 'vm-service/policy/search',
    params
  })
}

export const addPolicyAPI = (data) => {
  return request({
    url: 'vm-service/policy',
    method: 'POST',
    data
  })
}
/**
 * 查看策略详情
 * @param {String} policyId 策略ID
 * @param {*} params policyDetailPage: { // 详情弹窗的分页组件 pageIndex: 1,
        pageSize: 10  },

 * @returns
 */
export const getPolicyDetailAPI = (policyId, params) => {
  return request({
    url: `vm-service/policy/vmList/${policyId}`,
    params
  })
}
/**
  * 修改策略
  * @param {String} policyId 策略ID
  * @param {*} data policyName：策略名称 discount：策略方案
  * @returns
  */
export const exitPolicyAPI = (policyId, data) => {
  return request({
    url: `vm-service/policy/${policyId}`,
    method: 'PUT',
    data
  })
}

/**
 *
 * @param {String} policyId 策略ID
 * @param {*} params pageIndex：当前所在的页码，pageSize：每页几条数据 policyName：策略名称
 * @returns
 */
export const delPolicyAPI = (policyId, params) => {
  return request({
    url: `vm-service/policy/${policyId}`,
    method: 'DELETE',
    params
  })
}
