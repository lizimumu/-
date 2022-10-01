<template>
  <div class="home-user-task-stats-bgc1">
    <div class="header">
      <div class="title">工单统计 <span class="sub-title">{{ month. start_time }}~{{ month. end_time }}</span>
      </div>

    </div>
    <el-row :gutter="20" class="body">
      <el-col :span="6">
        <div class="stats">
          <div class="item">
            <div class="num">{{ total }}</div>
            <div class="text">工单总数 (个)</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6"><div class="stats"><div class="item">
        <div class="num">0</div>
        <div class="text">完成工单 (个)</div>
      </div></div></el-col>
      <el-col :span="6"><div class="stats"><div class="item">
        <div class="num">0</div>
        <div class="text">进行 (个)</div>
      </div></div></el-col>
      <el-col :span="6"><div class="stats"><div class="item">
        <div class="num">{{ Takeaway }}</div>
        <div class="text">取消工单 (个)</div>
      </div></div></el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getWorkOderAPI } from '@/api/home'

export default {
  data() {
    return {
      month: {
        start_time: dayjs().startOf('month').format('YYYY-MM-DD'),
        end_time: dayjs(new Date()).format('YYYY-MM-DD')
      },
      total: 0,
      Takeaway: 0
    }
  },
  created() {
    this.getWorkOder()
  },
  methods: {
    async getWorkOder() {
      try {
        // const { data } = await getWorkOderAPI(this.month.start_time, this.month.end_time)
        const { data } = await getWorkOderAPI('2022-09-01', '2022-09-30')
        this.total = data.reduce((acc, item) => {
          acc += item.total
          return acc
        }, 0)
        this.Takeaway = data.reduce((acc, item) => {
          acc += item.cancelTotal
          return acc
        }, 0)
      } catch (e) {
        console.log(e)
      }
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
    background-image: url('../../../assets/common/circle.png'),url('../../../assets/common/task.png');
    background-repeat: no-repeat,no-repeat;
    background-position: 0 0,calc(100% - 12px) 100%;
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
    padding: 0 15px;
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
