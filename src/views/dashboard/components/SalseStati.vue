<template>
  <div class="home-sku-sale-stats-bgc2">
    <div class="header">
      <div class="title">销售统计 <span class="sub-title">{{ month. start_time }}~{{ month. end_time }}</span>
      </div>
    </div>

    <el-row :gutter="20" class="body">
      <el-col :span="12">
        <div class="stats">
          <div class="item">
            <div class="num">{{ total }}</div>
            <div class="text">订单量 (个)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12"><div class="stats"><div class="item">
        <div class="num">{{ price }}</div>
        <div class="text">销售额 (万元)</div>
      </div></div></el-col>

    </el-row>

  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getReportStatAPI, getTimeGongDanAPI } from '@/api/home'
export default {

  data() {
    return {
      month: {
        start_time: dayjs().startOf('month').format('YYYY-MM-DD'),
        end_time: dayjs().endOf('month').format('YYYY-MM-DD')
      },
      price: 0,
      total: 0
    }
  },
  created() {
    this.getReportStat()
  },
  methods: {
    async getReportStat() {
      try {
        // const res = await getTimeGongDanAPI(this.month.start_time, this.month.end_time)
        const res = await getTimeGongDanAPI('2022-09-01', '2022-09-30')
        this.total = res.data
        // const { data } = await getReportStatAPI(this.month.start_time, this.month.end_time)
        const { data } = await getReportStatAPI('2022-09-01', '2022-09-30')
        console.log(data)
        this.price = (data / 1000000).toFixed(2)
      } catch (e) {
        console.log(666)
      }
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
    font-weight: 800;
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
