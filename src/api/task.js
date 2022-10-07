import request from '@/utils/request'
/**
 *获取 工单搜索
 * @param {NUmber} num1
 * @param {Number} num2
 * @returns
 */
export function getJobSearchAPI(data) {
  return request({
    url: `/task-service/task/search`,
    method: 'GET',
    params: data
  })
}
/**
 *获取所有工单数据列表
 * @returns
 */
export function getAllTaskStatusAPI() {
  return request({
    url: `/task-service/task/allTaskStatus`,
    method: 'GET'

  })
}
