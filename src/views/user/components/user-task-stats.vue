<template>
  <div class="app-main">
    <div class="one">
      <OperatingPersonnel :yunying="yunying" :start="start.substring(0,11)" :end="end.substring(0,11)" />
      <OperationsStaff :yunwei="yunwei" :start="start.substring(0,11)" :end="end.substring(0,11)" />
    </div>
    <div class="two">

      <el-card class="left-card">
        <div class="two-one">
          <GongdanStatus />
        </div>
      </el-card>
      <el-card class="right-card">
        <div class="two-two">
          <PeapleRenk />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { taskTotal } from '@/api/dmd_user'
import dayjs from 'dayjs'
import OperatingPersonnel from '../modules/OperatingPersonnel.vue'
import OperationsStaff from '../modules/OperationsStaff.vue'
import GongdanStatus from '../modules/GongdanStatus.vue'
import PeapleRenk from '../modules/PeapleRenk.vue'
export default {
  components: {
    OperatingPersonnel, OperationsStaff, GongdanStatus, PeapleRenk
  },
  data() {
    return {
      yunying: {},
      yunwei: {},
      start: '',
      end: ''
    }
  },
  created() {
    this.start = dayjs().startOf('date').format('YYYY-MM-DD HH:mm:ss')
    console.log(this.start)
    this.end = dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss')
    this.getTask()
  },
  methods: {
    async getTask() {
      const { data } = await (taskTotal(this.start, this.end))
      // console.log(data)
      this.yunying = data[0]
      // console.log(this.yunying)
      // console.log(Object.prototype.toString.call(this.yunying.cancelTotal))  // number
      this.yunwei = data[1]
      // console.log(this.yunwei)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 1753px;
  margin:0;
  padding:20px;
  .one{
    display: flex;
    justify-content: space-between;
  }
  .two{
    display: flex;
    justify-content: space-between;
    width: 1693px;
    height: 562px;
    margin-top: 20px;
    .left-card{
      width: 1280px;
    .two-one{
      width: 1280px;
      padding:20px;
      border-radius: 20px;
      }
    }
    .right-card{
      width: 400px;
      height: 567px;
      padding: 20px;
    }
  }
}
</style>
<style lang="scss">
.el-card__body{
    padding:0 ;
}
</style>
