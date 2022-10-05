<template>
  <div>
    <el-dialog
      title="区域详情"
      :visible.sync="dialogVisible"
      width="630px"
      :before-close="handleClose"
    >
      <div class="top">区域名称 :<span>{{ title }}</span></div>
      <div class="body"> <div class="left">包含点位:</div> <el-table
        :data="tableData"
        style="width: 100%"
        :row-style="{ height:'44px' }"
        :header-cell-style="{background:'#f3f6fb',fontSize:'14px', color:'#666666',fontWeight:'400', height:'42px' ,}"
      >
        <el-table-column
          type="index"

          label="序号"
          width="80px"
        />
        <el-table-column
          prop="name"
          label="点位名称"
        />
        <el-table-column
          prop="vmCount"
          label="设备数量"
        />
      </el-table></div>

    </el-dialog></div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '',
      tableData: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }

  }
}
</script>

<style scoped lang='scss'>
::v-deep  .el-dialog__header {
    background: #fff;
    color: #333;
     border-radius: 10px;
     font-weight: 400;
}
::v-deep .el-dialog__header .el-icon-close:before {
    color: #333;
}
::v-deep  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
}
::v-deep .el-dialog{
  border-radius: 10px;
}
.body{
  display: flex;

}
::v-deep .el-dialog__body {
    padding: 25px 20px;
    padding-left: 80px !important;
    padding-right: 75px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
::v-deep  .el-table::before{
    background-color: transparent ;
}
::v-deep  .el-table__header-wrapper {
    overflow: hidden;
  background-color: #fff;
}

 ::v-deep  .el-table td{
border-bottom: none;
height: 44px !important;
padding: 0px !important;
}
 ::v-deep .el-table tbody tr:hover>td { border-radius: 5px;}
 ::v-deep .el-table th.is-leaf {
    border-bottom: none;
    height: 44px;

}
.left{
padding-top: 18px;
margin-right: 20px;
}
.top{
    margin-bottom: 30px;
  span{
    margin-left: 20px;
  }
}
</style>
