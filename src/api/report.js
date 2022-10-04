import request from '@/utils/request'
/**
 * 获取一定时期内合作商的分成汇总数据
 * @param {Object} params partnerName:合作商名称 开始和结束日期，页码和每页的条数
 * @returns
 */
export const partnerCollectAPI = (params) => {
  return request({
    url: 'order-service/report/partnerCollect',
    params
  })
}
/**
 * 获取一定时间范围之内的分成总数
 * @param {Object} params partnerId合作商id 开始和结束时间
 * @returns
 */
export const getTotalBillAPI = (params) => {
  return request({
    url: 'order-service/report/totalBill',
    params
  })
}

/**
 * 获取一定时间范围之内的收入
 * @param {Object} params partnerId合作商id 开始和结束时间 innerCode:售货机编号：非必传
 * @returns
 */
export const getOrderAmountAPI = (params) => {
  return request({
    url: 'order-service/report/orderAmount',
    params
  })
}
/**
 * 获取一定时间范围之内的订单总数
 * @param {Object} params partnerId合作商id 开始和结束时间 innerCode:售货机编号：非必传
 * @returns
 */
export const getOrderCountAPI = (params) => {
  return request({
    url: 'order-service/report/orderCount',
    params
  })
}

/**
 * 合作商搜索
 * @param {Object} params name:合作商名称 pageIndex：页码 pageSize：每页的数据
 * @returns
 */
export const getPartnerListAPI = (params) => {
  return request({
    url: 'user-service/partner/search',
    params
  })
}

/**
 * 获取销售额
 * @param {Number} collectType 统计时间类型，1:按日统计，2:按月统计
 * @param {String} start 2020-01-01:开始日期
 * @param {String} end 2020-01-01:结束日期
 * @returns
 */
export const CaptureSalesAPI = (collectType, start, end) => {
  return request({
    url: `order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}
