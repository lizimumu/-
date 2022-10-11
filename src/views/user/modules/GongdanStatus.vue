<template>
  <div class="status">
    <div class="small">
      <div class="left">
        <TopTitle :title="'工单状态'" :start="start" :end="end" />
      </div>
      <div class="right">
        <DataChioce v-if="flag" :start="startData" />
        <div class="week-moth-year">
          <div v-for="(item,index) in timeList" :key="index" :class="{bgcolor: index===clickIndex}" @click="changeMouth(index)">{{ item }}</div>
        </div>
      </div>
    </div>
    <div class="big">
      <div class="img"><img src="@/assets/common/empty.png" alt=""></div>
      <div class="font"><span>暂无数据</span></div>
    </div>
  </div>
</template>

<script>
import TopTitle from './TopTitle.vue'
import DataChioce from './DataChioce.vue'
import dayjs from 'dayjs'
export default {
  components: {
    TopTitle, DataChioce
  },
  data() {
    return {
      start: '2022-09-01',
      end: '2022-09-29',
      timeList: ['周', '月', '年'],
      clickIndex: 0,
      startData: '',
      flag: false
    }
  },
  // Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
  watch: {
    clickIndex() {
      // 索引一变化就自动调用这个函数
      this.$nextTick(() => {
        this.flag = true
      })
    }
  },
  created() {
    // 这个是让一进页面就有日历数据
    this.changeMouth()
  },
  methods: {
    changeMouth(a) {
      // 但是这个a一变化flag就自动为true了 其实日历页面一直都存在的
      this.clickIndex = a
      // 点击一次让他为false 如果监听到这个a变化了 就自动为true
      this.flag = false
      // 周
      if (a === 0) {
        this.startData = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
      }
      // 月
      if (a === 1) {
        this.startData = dayjs().startOf('month').format('YYYY-MM-DD')
      }
      // 年
      if (a === 2) {
        this.startData = dayjs().startOf('year').format('YYYY-MM-DD')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.status{
    height: 542px;
    .small{
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .right{
        display: flex;
        align-items: center;
      }
    }
    .big{
        width: 1240px;
        height: 520px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
.bgcolor{
  width: 37px;
  height: 25px;
  line-height: 25px;
  text-align: center;
    background: #fff !important;
     border-radius: 7px;
     -webkit-box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
    box-shadow: 0 0 4px 0 rgb(0 0 0 / 11%);
     font-weight: 600;
     color:black !important;
}
.week-moth-year{
      display: flex;
      width: 129px;
      height: 34px;
      line-height: 34px;
      justify-content: space-evenly;
      align-items: center;
      background-color: #f7fbff;
      cursor: pointer;
      .item{
    color: #9ca3b4;
        padding: 0 5px;
        text-align: center;
        width: 38px;
        background-color: transparent;
      }
    }
</style>
