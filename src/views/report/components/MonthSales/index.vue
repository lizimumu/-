<template>
  <div class="home-sku-sale-stats-bgc2">
    <div class="header">
      <div class="title">
        月销售统计

      </div>
    </div>

    <el-row :gutter="20" class="body">
      <el-col :span="8">
        <div class="stats">
          <div class="item">
            <div class="num">{{ orderCount }}</div>
            <div class="text">当月销售量 (个)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8"><div class="stats"><div class="item">
        <div class="num">{{ orderAmount }}</div>
        <div class="text">当月销售额 (元)</div>
      </div></div></el-col>
      <el-col :span="8"><div class="stats"><div class="item">
        <div class="num">{{ totalBill }}</div>
        <div class="text">当月分成 (元)</div>
      </div></div></el-col>
    </el-row>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getTotalBillAPI, getOrderAmountAPI, getOrderCountAPI } from '@/api/report'
export default {
  data() {
    return {
      report: {
        partnerId: '',
        collectType: 1,
        start: dayjs().startOf('month').format('YYYY-MM-DD'),
        end: dayjs(new Date()).format('YYYY-MM-DD')
      },
      partnerList: [],
      totalBill: 0,
      orderAmount: 0,
      orderCount: 0
    }
  },

  created() {
    this.getTotalBill()
    this.getOrderAmount()
    this.getOrderCount()
  },
  methods: {
    // 每个月的分成
    async getTotalBill(val) {
      const { data } = await getTotalBillAPI({ partnerId: val?.partner.id, start: `${this.report.start} 12:00:00`, end: `${this.report.end} 12:00:00` })
      // console.log(data)
      this.totalBill = data === '0' ? 0 : (data / 100).toFixed(2)
    },
    // 每个月的销售额
    async getOrderAmount(val) {
      const { data } = await getOrderAmountAPI(
        { partnerId: val?.partner.id, start: `${this.report.start} 12:00:00`, end: `${this.report.end} 12:00:00` })
      // console.log(data)
      this.orderAmount = data === '0' ? 0 : (data / 100).toFixed(2)
    },
    // 每个月的订单量
    async getOrderCount(val) {
      const { data } = await getOrderCountAPI({ partnerId: val?.partner.id, start: `${this.report.start} 12:00:00`, end: `${this.report.end} 12:00:00` })
      // console.log(data)
      this.orderCount = data
    }

  }
}
</script>

<style lang='scss'>

.home-sku-sale-stats-bgc2{

  // width: 556px;
  height: 172px;
margin-right: 20px;
  border-radius: 20px;
  padding: 20px;
  font-size: 800px;
  background: #fbefe8 url('~@/assets/common/pinkpig.png') no-repeat calc(100% - 12px) 100%;
  .header{
width: 100%;
display: flex;
height: 20px;
.title{
  font-size: 16px;
  color: #333;
}
.sub-title{
  font-size: 12px;
  color: #999;
  font-weight: 400;
  margin-left: 5px;
}
  }
  .body{
    width: 100%;
    height: 113px;

    .stats{
    padding: 0 52px;
      height: 113px;
display: flex;
align-items: center;
line-height:30px ;
.num{
  font-size: 36px;
    font-weight: 700;
    color: #ff5757;
   text-shadow: 2px 4px 7px rgb(255 99 85 / 50%) !important;
    margin-top: 5px;

}
  .text{
   height: 17px;
    margin-top: 12px;
    font-size: 12px;
    margin-left: 8px;

    font-weight: 400;
    color: #de9690;
    line-height: 17px;
  }
    }
  }
}

</style>
