<template>
  <div>
    <el-dialog v-if="dialogTableVisible" :visible="dialogTableVisible" :show-close="false">
      <template #title>
        <div style="display:flex;justify-content: space-between;">
          <span class="title">人员信息</span>
          <span class="close" style="color:#c1c1c1;" @click="close">X</span>
        </div>
      </template>
      <div>
        <el-row class="user-info">
          <el-col :span="9">人员名称：{{ clickUserInfo.userName }}</el-col>
          <el-col :span="7">角色：{{ clickUserInfo.roleName }}</el-col>
          <el-col :span="8">联系电话：{{ clickUserInfo.mobile }}</el-col>
          <el-col :span="24" class="region-name">负责区域：霍营街道</el-col>
        </el-row>
        <el-row class="user-work">
          <el-col :span="5" class="item"><span style="color:#f7f8fd;">1</span></el-col>
          <el-col :span="5" class="item">总工单数</el-col>
          <el-col :span="5" class="item">拒绝工单</el-col>
          <el-col :span="5" class="item">完成工单</el-col>
          <el-col :span="5" class="item">进行中工单</el-col>
        </el-row>
        <el-row class="user-work">
          <el-col :span="5" class="item">本周</el-col>
          <el-col :span="5" class="item">{{ weekData.total }}</el-col>
          <el-col :span="5" class="item">{{ weekData.cancelCount }}</el-col>
          <el-col :span="5" class="item">{{ weekData.workCount }}</el-col>
          <el-col :span="5" class="item">{{ weekData.progressTotal }}</el-col>
        </el-row>
        <el-row class="user-work">
          <el-col :span="5" class="item">本月</el-col>
          <el-col :span="5" class="item">{{ mouthData.total }}</el-col>
          <el-col :span="5" class="item">{{ mouthData.cancelCount }}</el-col>
          <el-col :span="5" class="item">{{ mouthData.workCount }}</el-col>
          <el-col :span="5" class="item">{{ mouthData.progressTotal }}</el-col>
        </el-row>
        <el-row class="user-work">
          <el-col :span="5" class="item">本年</el-col>
          <el-col :span="5" class="item">{{ yearData.total }}</el-col>
          <el-col :span="5" class="item">{{ yearData.cancelCount }}</el-col>
          <el-col :span="5" class="item">{{ yearData.workCount }}</el-col>
          <el-col :span="5" class="item">{{ yearData.progressTotal }}</el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { userTaskWorkAPI } from '@/api/dmd_user'
import dayjs from 'dayjs'
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    clickUserInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dialogTableVisible: this.isShow,
      yearStart: '',
      yearEnd: '',
      mouthStart: '',
      mouthEnd: '',
      weekStart: '',
      weekEnd: '',
      yearData: {},
      mouthData: {},
      weekData: {}

    }
  },
  watch: {
    isShow: {
      handler(newVal) {
        this.dialogTableVisible = newVal
      },
      deep: true,
      immediate: true
    },
    clickUserInfo: {
      handler(newVal) {
        this.getWorkList()
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.mouthStart = dayjs().startOf('month').format('YYYY-MM-DD HH:mm:ss')
    this.yearEnd = dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss')
    this.yearStart = dayjs().startOf('year').format('YYYY-MM-DD HH:mm:ss')
    this.mouthEnd = dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss')
    this.weekStart = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD HH:mm:ss')
    this.weekEnd = dayjs().endOf('date').format('YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    close() {
      console.log('123', this.clickUserInfo)
      this.$emit('update:isShow', false)
    },
    async getWorkList() {
      // 年
      // console.log(userTaskWorkAPI(
      //   this.clickUserInfo.userId,
      //   this.yearStart,
      //   this.yearEnd
      // ))
      const { data } = await userTaskWorkAPI(
        this.clickUserInfo.userId,
        this.yearStart,
        this.yearEnd
      )
      this.yearData = data
      // 月
      const res = await userTaskWorkAPI(
        this.clickUserInfo.userId,
        this.mouthStart,
        this.mouthEnd
      )
      this.mouthData = res.data
      // 周
      const resData = await userTaskWorkAPI(
        this.clickUserInfo.userId,
        this.weekStart,
        this.weekEnd
      )
      this.weekData = resData.data
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header{
    background-color: #fff;
}
::v-deep .total{
  width: 580px;
  height: 277px;
  background-color: aqua;
}
::v-deep .title{
  font-weight: 700;
}
::v-deep .close{
  cursor: pointer;
}

::v-deep .user-info{
      height: 86px;
    padding: 19px 19px 0;
    background: #f3f6fb;
}
::v-deep .user-work{
      border-top: 1px solid #d8dde3;
    border-left: 1px solid #d8dde3;
}
::v-deep .user-work:nth-child(2) {
    margin-top: 26px;
    background: #f7f8fd}
    .el-dialog{
      width: 620px;
    }
::v-deep .el-dialog {
  width: 630px;
    padding: 20px 0 ;
    color: #666;
    font-size: 14px;
    word-break: break-all;
}
::v-deep .el-dialog__body {
  width:630px;
   padding: 20px 20px 30px;
    color: #666;
    font-size: 14px;
    word-break: break-all;
}
::v-deep .user-info .region-name {
    margin-top: 15px;
}
::v-deep .user-work .item {
  float: left;
    line-height: 40px;
    border-right: 1px solid #d8dde3;
    text-align: center;

}
::v-deep .el-col-5 {
    width: 20%;
}
</style>
