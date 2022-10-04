<template>
  <div class="home-user-task-stats-bgc1">
    <div class="header">
      <div class="title">
        日销售额
      </div>

    </div>
    <el-row :gutter="20" class="body">
      <el-col :span="8">
        <div class="stats">
          <div class="item">
            <div class="num">
              {{ dayOrderCount }}
            </div>
            <div class="text">
              当日销售量 (个)
            </div>
          </div></div></el-col>
      <el-col :span="8"><div class="stats"><div class="item">
        <div class="num">{{ dayOrderAmount }}</div>
        <div class="text">当日销售额 (元)</div>
      </div></div></el-col>
      <el-col :span="8"><div class="stats"><div class="item">
        <div class="num">{{ dayTotalBill }}</div>
        <div class="text">当日分成 (元)</div>
      </div></div></el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getOrderCountAPI, getTotalBillAPI, getOrderAmountAPI } from '@/api/report'
export default {

  data() {
    return {
      day: {
        start: `${dayjs(new Date()).format('YYYY-MM-DD')} 00:00:00`,
        end: `${dayjs(new Date()).format('YYYY-MM-DD')} 23:59:59`
      },
      dayOrderCount: 0, // 每天的订单
      dayTotalBill: 0, // 每天所有的分成
      dayOrderAmount: 0
    }
  },
  created() {
    this.getOrderCount()
    this.getTotalBill()
    this.getOrderAmount()
  },
  methods: {
    async  getOrderCount() {
      const { data } = await getOrderCountAPI(this.day)
      // console.log(data)
      this.dayOrderCount = data
    },
    // 每天的分成
    async getTotalBill() {
      const { data } = await getTotalBillAPI(this.day)
      // console.log(data)
      this.dayTotalBill = data === '0' ? 0 : (data / 100).toFixed(2)
    },
    // 每天的销售额
    async getOrderAmount() {
      const { data } = await getOrderAmountAPI(this.day)
      // console.log(data)
      this.dayOrderAmount = data === '0' ? 0 : (data / 100).toFixed(2)
    }
  }
}
</script>

<style lang='scss'>
.home-user-task-stats-bgc1{
  // width: 556px;
  height: 172px;
margin-right: 20px;
  border-radius: 20px;
  padding: 20px;
background-color: #e9f3ff;
    background-image: url('~@/assets/common/circle.png'),url('~@/assets/common/task.png');
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
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
    padding: 0 25px;
      height: 113px;
display: flex;
align-items: center;
line-height:30px ;
.num{
  font-size: 36px;
    font-weight: 700;
    color: #072074;
    text-shadow: 2px 4px 7px rgb(85 132 255 / 50%);
    margin-top: 5px;

}
  .text{
   height: 17px;
    margin-top: 12px;
    font-size: 12px;

    font-weight: 400;
    color: #91a7dc !important;
    line-height: 17px;
  }
    }
  }
}
</style>
