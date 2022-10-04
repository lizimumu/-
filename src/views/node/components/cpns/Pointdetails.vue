<template>
  <div>
    <el-dialog
      title="点位详情"
      :visible.sync="dialogVisible"
      width="630px"
      :before-close="handleClose"
    >
      <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
        :row-style="{ height:'44px' }"
        :header-cell-style="{background:'#f3f6fb',fontSize:'14px', color:'#666666',borderRadius:'5px' ,fontWeight:'400', height:'44px !important' ,}"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="innerCode"
          label="机器编号"
        /> <el-table-column
          prop="vmStatus"
          label="设备状态"
        /> <el-table-column
          prop="lastSupplyTime"
          label="最后一次供货事件"
        />

      </el-table>

    </el-dialog>
  </div>
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
::v-deep .el-dialog__header {
    background: #fff;
    color: #333;
     border-radius: 10px;
     font-weight: 600;
     font-size:14px,
}
::v-deep .el-dialog__header .el-icon-close:before {
    color: #333;
}
::v-deep .el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #303133;
}
::v-deep .el-dialog__body {
    padding: 30px 40px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
::v-deep .el-dialog{
  border-radius: 10px;
}
.el-dialog .el-dialog__body .el-form-item {
    margin-bottom: 20px;
}
</style>
