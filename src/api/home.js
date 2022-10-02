import request from '@/utils/request'
import dayjs from 'dayjs'
/**
 * 销售折线图
 * @param {开始时间} start
 * @param {结束时间} end
 * @returns
 */
export const getSellInfo = (num, start, end) => {
  return request({
    url: `/order-service/report/amountCollect/${num}/${start}/${end}`
  })
}
/**
 *获取热门商品
 */
export const getHotShopApI = (start, end) => {
  return request({
    url: `/order-service/report/skuTop/10/${start}/${end}`,
    method: 'GET'
  })
}
/**
 *获取工单统计
 */
export const getWorkOderAPI = (start, end) => {
  return request({
    url: `/task-service/task/taskReportInfo/${start}%2000:00:00/${end}%2023:59:59`
  })
}
/**
 * 获取一定时间内的工单总金额
 */
export const getReportStatAPI = (start, end) =>
  request({
    url: '/order-service/report/orderAmount',
    method: 'GET',
    params: {
      start: `${start} 00:00:00`,
      end: `${end} 23:59:59`
    }

  })
  /**
   *获取一定事件内的工单总数
   */
export const getTimeGongDanAPI = (start, end) =>
  request({
    url: '/order-service/report/orderCount',
    method: 'GET',
    params: {
      start: `${start} 00:00:00`,
      end: `${end} 23:59:59`
    }
  })
export const getSalesDistriButionAPI = (start, end) =>
  request({
    url: `/order-service/report/regionCollect/${start}/${end}`,
    method: 'GET'

  })
  /**
   * 封装时间函数
   * @returns
   */
export const getCurrentWeek = () => {
  var date = new Date()
  var day = date.getDay() || 7
  var start_time = dayjs(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day)).format('YYYY-MM-DD')
  var end_time = dayjs(new Date()).format('YYYY-MM-DD')
  return {
    start_time,
    end_time
  }
}
/**
 * 获取合作商总数
 */
export const TotalCooperativeQuotientAPI = () =>
  request({
    url: '/user-service/partner/count',
    method: 'GET'

  })

/**
 *
 * @returns 获取点位总数
 */
export const TotalNumberPointsAPI = () =>
  request({
    url: '/vm-service/node/count',
    method: 'GET'

  })
  // 获取点位top5
export const getPointTop5API = () =>
  request({
    url: '/vm-service/node/nodeCollect',
    method: 'GET'

  })
