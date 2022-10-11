import request from '@/utils/request'

/**
 * 人员搜索(列表页)
 * @param {*} params
 * @returns Promise
 */
export const getUserListAPI = (params) => {
  return request({
    url: '/user-service/user/search',
    params
  })
}

/**
 * 人员工作量列表
 * @param {*} params
 * @returns Promise
 */
export const getUserWorkListAPI = (params) => {
  return request({
    url: '/user-service/user/searchUserWork',
    params
  })
}

/**
 * 区域列表
 * @returns Promise
 */
export const areaListAPI = () => {
  return request({
    url: '/vm-service/region/search'
  })
}

/**
 * 修改人员信息
 * @param {*} id
 * @returns Promise
 */
export const editUserAPI = (data, id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'PUT',
    data
  })
}

/**
 * 删除人员
 * @param {*} id
 * @returns Promise
 */
export const delUserAPI = (id) => {
  return request({
    url: `/user-service/user/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增人员
 * @param {*} data
 * @returns Promise
 */
export const addUserAPI = (data) => {
  return request({
    url: '/user-service/user',
    method: 'POST',
    data
  })
}

/**
 * 角色列表
 * @param {*} params
 * @returns Promise
 */
export const getRoleAPI = (params) => {
  return request({
    url: '/user-service/role',
    params
  })
}

/**
 * 人员搜索(列表页)
 * @returns Promise
 */
export const searchUserAPI = (userName, pageIndex, pageSize) => {
  return request({
    url: '/user-service/user/search',
    params: {
      userName, pageIndex, pageSize
    }
  })
}

/**
 *获取当时工单汇总信息(人员统计头部信息)
 * @param {*} start 2020-01-01 00:00:00
 * @param {*} end 2020-01-01 23:59:59
 * @returns
 */
export const taskTotal = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

/**
 * 获取用户工作量(工单统计)
 * @param {} params
 * @returns Promise
 */
export const userTaskWorkAPI = (userId, start, end) => {
  return request({
    url: '/task-service/task/userWork',
    params: {
      userId, start, end
    }
  })
}

/**
 * 上传图片
 * @returns Promise
 */
export const uploadImageAPI = (data) => {
  return request({
    url: '/vm-service/sku/fileUpload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
