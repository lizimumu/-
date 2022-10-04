<template>
  <div class="report-container">
    <!-- 上部分区域 -->
    <el-row type="flex" class="row-bg" justify="space-between">
      <!-- 日销售额区域 -->
      <el-col :span="12">
        <daily-sale :order-count="orderCount" />
        <!-- 销售统计 -->
      </el-col>
      <el-col :span="12">
        <month-sales />
      </el-col>
    </el-row>
    <!-- 搜索区域 -->

    <el-card class="report-card">
      <report-search
        :title1="title1"
        :title2="title2"
        :partner-msg-list="partnerMsgList"
        @searchPartnerReport="searchPartnerReport"
      />
      <el-row class="report-stats">
        <el-col :span="5">
          <div>
            <span>笔数统计：</span>
            <span class="report-stats-num">{{ orderCount }}</span>
            <span class="report-stats-unit">个</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div>
            <span>收入统计：</span>
            <span class="report-stats-num">{{ orderAmount }}</span>
            <span class="report-stats-unit">元</span>
          </div>
        </el-col>
        <el-col :span="14">
          <div>
            <span>分成统计：</span>
            <span class="report-stats-num">{{ totalBill }}</span>
            <span class="report-stats-unit">元</span>
          </div>
        </el-col>
      </el-row>
      <div>
        <report-form :partner-list="partnerList" />
      </div>

    </el-card>
    <!-- 分页区域 -->
    <control-page
      v-if="isShowPage"
      :total-count="totalCount"
      :total-page="totalPage"
      :page-size="report.pageSize"
      :page-index="report.pageIndex"
      @toPrevPolicy="toPrevPolicy"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import MonthSales from '../components/MonthSales'
import DailySale from '../components/DailySales'
import ReportSearch from './ReportSearch'
import ReportForm from './ReportForm'
import ControlPage from './ControlPage'
import { partnerCollectAPI, getPartnerListAPI, getTotalBillAPI, getOrderAmountAPI, getOrderCountAPI } from '@/api/report'
export default {
  components: {
    MonthSales,
    DailySale,
    ReportSearch,
    ReportForm,
    ControlPage
  },
  data() {
    return {
      title1: '合作商：',
      title2: '日期：',
      report: {
        partnerName: '',
        start: dayjs().startOf('month').format('YYYY-MM-DD'),
        end: dayjs(new Date()).format('YYYY-MM-DD'),
        pageIndex: 1,
        pageSize: 10
      },
      partnerList: [], // 所有的分成数据
      partner: {
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      partnerMsgList: [], // 所有的供应商
      totalBill: 0,
      orderAmount: 0,
      orderCount: 0,
      totalPage: 0,
      totalCount: 0,
      isShowPage: false
    }
  },
  watch: {
    totalCount(val) {
      this.isShowPage = false
      if (val > 10) {
        this.$nextTick(() => {
          this.isShowPage = true
        })
      }
    }
  },
  created() {
    this.partnerCollect()
    this.getPartnerList()
    this.getTotalBill()
    this.getOrderAmount()
    this.getOrderCount()
  },
  methods: {
    // 根据供应商名字获取分成数据
    async partnerCollect() {
      const { data } = await partnerCollectAPI(this.report)
      // console.log(data)
      this.partnerList = data.currentPageRecords
      this.report.pageIndex = data.pageIndex
      this.totalCount = data.totalCount
      this.totalPage = data.totalPage
    },
    // 获取所有的合作商
    async getPartnerList() {
      const { data } = await getPartnerListAPI(this.partner)
      // console.log(data)
      this.partnerMsgList = data.currentPageRecords
    },
    // 点击搜索框的时候根据供应商的名字获取所有数据
    searchPartnerReport(val) {
      // console.log(val)
      this.$set(this.report, 'partnerName', val.partnerName)
      if (val.value1[0] !== dayjs().startOf('month').format('YYYY-MM-DD') && val.value1[1] !== dayjs(new Date()).format('YYYY-MM-DD')) {
        this.$set(this.report, 'start', dayjs(val.value1[0]).format('YYYY-MM-DD'))
        this.$set(this.report, 'end', dayjs(val.value1[1]).format('YYYY-MM-DD'))
      }
      // console.log(this.report)
      this.partnerCollect()
      this.getTotalBill(val)
      this.getOrderAmount(val)
      this.getOrderCount(val)
    },
    // 根据供应商名字获取所有的分成数据
    async getTotalBill(val) {
      const { data } = await getTotalBillAPI({ partnerId: val?.partner.id, start: `${this.report.start} 00:00:00`, end: `${this.report.end} 23:59:59` })
      // console.log(data)
      this.totalBill = (data / 100).toFixed(2)
    },
    // 获取一定时间内的收入
    async getOrderAmount(val) {
      const { data } = await getOrderAmountAPI(
        { partnerId: val?.partner.id, start: `${this.report.start} 00:00:00`, end: `${this.report.end} 23:59:59` })
      // console.log(data)
      this.orderAmount = (data / 100).toFixed(2)
    },
    // 获取一定时间内的订单总数
    async getOrderCount(val) {
      const { data } = await getOrderCountAPI({ partnerId: val?.partner.id, start: `${this.report.start} 00:00:00`, end: `${this.report.end} 23:59:59` })
      // console.log(data)
      this.orderCount = data
    },
    toPrevPolicy(pageIndex) {
      console.log(pageIndex)
      this.report.pageIndex = pageIndex
      this.partnerCollect()
    }
  }
}
</script>

<style scoped lang="scss">
.report-container {
  padding-left: 20px;
  .report-card {
    margin-top: 20px;
    .report-stats {
      margin-bottom: 20px;
      color: #333;
      font-size: 14px;
      .report-stats-num {
        margin: 0 10px;
        font-size: 20px;
        font-weight: 700;
        color: #ff576d;
      }
      .report-stats-unit{
        font-size: 12px;
        color: #000;
      }
    }
  }
}
</style>
