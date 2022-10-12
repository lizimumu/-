import request from '@/utils/request'

/**
 * 商品类型搜索
 * @returns
 */
export const skuClassSearchAPI = (pageIndex, pageSize, className) =>
  request({
    url: '/vm-service/skuClass/search',
    method: 'GET',
    params: { pageIndex, pageSize, className }
  })

/**
   * 修改商品类型
   * @param {*} classId
   * @returns
   */
export const changeskuClassAPI = (className, classId) =>
  request({
    url: `/vm-service/skuClass/${classId}`,
    method: 'PUT',
    data: { className }
  })

/**
 *新增商品类型
 * @param {*} className
 * @returns
 */
export const addskuClassAPI = (className) =>
  request({
    url: '/vm-service/skuClass',
    method: 'POST',
    data: { className }
  })

/**
 * 商品搜索
 * @returns
 */
export const skuSearchAPI = (pageIndex, pageSize, skuName) =>
  request({
    url: '/vm-service/sku/search',
    method: 'GET',
    params: { pageIndex, pageSize, skuName }
  })
/**
	 *
	 * @returns修改商品
	 */
export const changeSkuAPI = (data) =>
  request({
    url: `/vm-service/sku/${data.skuId}`,
    method: 'PUT',
    data
  })

/**
	 *新增商品
	*/
export const AddSkuAPI = (data) =>
  request({
    url: '/vm-service/sku',
    method: 'POST',
    data
  })
/**
	 *
	 * @returns商品文件上传
	 */
export const btnaddDataAPI = (fileName) =>
  request({
    url: '/vm-service/sku/upload',
    method: 'POST',
    data: { fileName }
  })
