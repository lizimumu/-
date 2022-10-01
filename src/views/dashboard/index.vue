<template>
  <div class="dashboard-container">

    <el-row :gutter="20">
      <el-col :span="18"><div class="grid-content bg-purple">
        <el-row type="flex" class="row-bg" justify="space-between">
          <!-- 工单统计 -->
          <el-col :span="13">
            <workorder />
            <!-- 销售统计 -->
          </el-col>
          <el-col :span="11"><StalesStati /> </el-col>
        </el-row>
        <div class="sku-sale-collect">
          <div class="header">
            <div class="title">销售数据 <span>{{ time.start_time }}~{{ time.end_time }}</span> </div>
            <div class="week-moth-year"> <div v-for="(item,index) in timeList" :key="index" :class="{bgcolor: index===ind}" class="item" @click="changeData(index)">{{ item }}</div>
            </div>
          </div> <el-row class="charts">
            <el-col :span="12"><div class="chart"><SaleStrend ref="child" /></div></el-col>
            <el-col :span="12"><div class="chart"><SalesDistribution ref="child2" /></div></el-col>
          </el-row></div>
      </div></el-col>
      <!-- 热门商品 -->
      <el-col :span="6"><div class="hot-shop">
        <div class="header">
          <div class="title">商品热榜 <span class="sub-title">{{ month.start_time }}~{{ month. end_time }}</span>
          </div>
        </div>
        <div class="body">  <el-row v-for="(item,index) in hotList" :key="index">
          <el-col :span="5">
            <div class="top1" :style="{'background-image':'url('+hotList[index].src+')',backgroundRepeat:'no-repeat',}"><span :class="{ kk: index > 2}">{{ index+1 }}</span>
            </div></el-col>
          <el-col :span="13"><div class="sku-name">{{ item.skuName }}</div></el-col>
          <el-col :span="6"><div class="count">{{ item.count }}单</div></el-col>
        </el-row>
        </div>
      </div></el-col>
    </el-row>
    <el-row class="button">
      <el-col :span="14">
        <div class="partner-node-collect">
          <div class="header">
            <div class="title">合作商点位数Top5</div>
            <span class="iconfont icon-19" />
          </div>
          <div class="bingtu"><partnerLocation /><div data-v-46f7d62d="" class="collect"><div data-v-46f7d62d="" class="count">
            {{ num2 }}
          </div><div data-v-46f7d62d="" class="name">
            点位数
          </div><div data-v-46f7d62d="" class="count count2">
            {{ num1 }}
          </div><div data-v-46f7d62d="" class="name">
            合作商数
          </div></div></div>
        </div></el-col>
      <el-col :span="10">
        <div class="abnormal-equipment">
          <div class="header">
            <div class="title">异常设备监控</div>
            <span class="iconfont icon-19" />
          </div>
          <div class="body"> <Equipment /></div>
        </div></el-col>
    </el-row>

  </div>
</template>
<script>
import workorder from './components/workorder.vue'
import { getHotShopApI, getCurrentWeek, TotalCooperativeQuotientAPI, TotalNumberPointsAPI } from '@/api/home'
import top1 from '../../assets/lkdimg/top1.png'
import top2 from '../../assets/lkdimg/top2.png'
import top3 from '../../assets/lkdimg/top3.png'
import top4 from '../../assets/lkdimg/top4.png'
import SaleStrend from './components/Salestrend.vue'
import StalesStati from './components/SalseStati.vue'
import dayjs from 'dayjs'
import SalesDistribution from './components/SalesDistribution.vue'
import Equipment from './components/EquipmentAbnormal..vue'
import partnerLocation from './components/PartnerLocation.vue'
export default {
  name: 'Dashboard',
  components: {
    SaleStrend,
    workorder,
    StalesStati,
    SalesDistribution,
    Equipment,
    partnerLocation
  },
  data() {
    return {
      time: getCurrentWeek(),
      month: {
        start_time: dayjs().startOf('month').format('YYYY-MM-DD'),
        end_time: dayjs(new Date()).format('YYYY-MM-DD')
      },
      year: {
        start_time: dayjs().startOf('year').format('YYYY-MM-DD'),
        end_time: dayjs(new Date()).format('YYYY-MM-DD')
      },

      ind: 0,
      timeList: ['周', '月', '年'],
      flag: true,
      hotimg: [],
      imgs: [top1, top2, top3, top4],
      hotList: [],
      num1: '',
      num2: ','

    }
  },
  created() {
    this.getHOstShop()
    this.getTotalCooperativeQuotient()
    this.getTotalNumberPoints()
  },
  methods: {
    async  getTotalCooperativeQuotient() {
      const { data } = await TotalCooperativeQuotientAPI()
      this.num1 = data
    },
    async  getTotalNumberPoints() {
      const { data } = await TotalNumberPointsAPI()
      this.num2 = data
      console.log(data)
    },
    async getHOstShop() {
      for (let i = 0; i < 6; i++) {
        this.imgs.push(top4)
      }
      try {
        const { data } = await getHotShopApI('2022-09-01', '2022-09-30')
        data.forEach((item, index) => {
          item.src = this.imgs[index]
        })
        this.hotList = data
      } catch (e) {
        console.log(e)
      }
    },
    changeData(index) {
      this.ind = index

      if (index === 0) {
        this.time = getCurrentWeek()
      } if (index === 1) {
        this.time = this.month
      }
      if (index === 2) {
        this.time = this.year
      }
      this.$refs.child.getSell(index)
      this.$refs.child2.getSalesDistriBution(index)
    }
  }
}
</script>
<style lang="scss" scoped>
.kk{
  margin-right: 3px;
}
.bgcolor{
    background: #fff !important;
     border-radius: 7px;
     -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
     font-weight: 600;
     color:black !important;
}
.dashboard {
  &-container {
    margin-left: 20px;
  }
}
.grid-content {
  height: 538px;
background-color:#f8fafd;
}
.hot-shop {
  height: 558px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
.top1{
  width: 20px !important;
  // text-align: center;
  // margin: auto;
text-align: center;
  height: 20px;
  margin-bottom: 28px;
span{
  display: inline-block;
  margin-top: 2px !important;
}
}
 .sku-name{
height: 20px;
    font-size: 14px !important;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #333;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .count{
    color: #737589;
    font-size: 14px;
    margin-left: 15px;
  }
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
    margin-top: 20px;
    padding-left: 12px;
  }
}
.row-bg{
  width: 100%;
}
.sku-sale-collect{
  width: 100%;
 min-height: 352px;
 margin-top: 15px;
  background-color: #fff;
  margin-top: 20x;
  padding: 20px;
  border-radius: 20px;
  .header{
 display: flex;
 justify-content: space-between;
    width: 100%;
    height: 34px;
    background-color: #fff;
    line-height: 34px;
    .title{
      font-size: 16px;
      font-weight: 7000;
      span{
        color: #999;
        font-size: 12px;
      }
    }
    .week-moth-year{
      display: flex;
      width: 129px;
      justify-content: space-evenly;
      background-color: #f7fbff;
      .item{
    color: #9ca3b4;
        padding: 0 5px;
        text-align: center;
        width: 38px;
        background-color: transparent;
      }
    }
  }
  .charts{
    width: 100%;
    height: 278px;
    background-color: #fff;
    margin-top: 18px;
    .chart{
      height:278px !important;
    }
  }
}
.button{
  margin-top: 20px;
  height: 353px;
  // background-color: #fff;
  .partner-node-collect{
background-color: #fff;
height: 353px;
  border-radius: 20px;
  padding: 20px;
  }
  .partner-node-collect,
  .abnormal-equipment{
    .header{
      height: 20px;
      display: flex;
      justify-content: space-between;
      .title{
        font-size: 16px;
        color: #333;
        font-weight: 700;
      }
        .icon-19{
          color: #2879fe;
          font-size: 18px;
        }
    }
  }
  .abnormal-equipment{
    background-color:#fff;
    height: 353px;
      border-radius: 20px;
      margin-left: 20px;
      padding: 20px;
     .body{
      height: 100%;
       display: flex;
      justify-content: center;
      align-items: center;
     }

  }
}
#main {
  width: 95%;
  height: 280px;
}
.bingtu{
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  .collect{
    margin-right: 100px;
    width: 154px;
    height: 230px;
    padding-top: 47px;
    padding-left: 38px;
    background: linear-gradient(135deg,transparent,#f8f8f9 0) 0 0,linear-gradient(-135deg,transparent 12px,#f8f8f9 0) 100% 0,linear-gradient(-45deg,transparent,#f8f8f9 0) 100% 100%,linear-gradient(45deg,transparent 12px,#f8f8f9 0) 0 100%;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    .count{
      height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Semibold,PingFang SC;
    font-weight: 600;
    color: #072074;
    line-height: 33px;
    }
    .name {
    height: 17px;
    margin-top: 6px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #000412;
    line-height: 17px;
}
 .count2{
    margin-top: 20px;
}
}

}
</style>
