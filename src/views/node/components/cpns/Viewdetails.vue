<template>
  <div><el-dialog
    title="区域详情"
    class="body"
    :visible.sync="dialogVisible"
    width="630px"
    :before-close="handleClose"
  >
    <form class="el-form"><div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">区域名称：</label><div class="el-form-item__content" style="margin-left: 140px;">
      城北街道
    </div></div><div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">包含点位：</label><div class="el-form-item__content" style="margin-left: 140px;"><div class="el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;"><div class="hidden-columns"><div /><div /><div /></div><div class="el-table__header-wrapper"><table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 396px;"><colgroup><col name="el-table_2_column_6" width="80"><col name="el-table_2_column_7" width="158"><col name="el-table_2_column_8" width="158"><col name="gutter" width="0"></colgroup><thead class="has-gutter"><tr class=""><th colspan="1" rowspan="1" class="el-table_2_column_6     is-leaf" style="line-height: 1.15; padding: 10px 0px 9px; background: rgb(243, 246, 251); font-weight: 500; text-align: left; color: rgb(102, 102, 102);"><div class="cell">序号</div></th><th colspan="1" rowspan="1" class="el-table_2_column_7     is-leaf" style="line-height: 1.15; padding: 10px 0px 9px; background: rgb(243, 246, 251); font-weight: 500; text-align: left; color: rgb(102, 102, 102);"><div class="cell">点位名称</div></th><th colspan="1" rowspan="1" class="el-table_2_column_8     is-leaf" style="line-height: 1.15; padding: 10px 0px 9px; background: rgb(243, 246, 251); font-weight: 500; text-align: left; color: rgb(102, 102, 102);"><div class="cell">设备数量</div></th><th class="gutter" style="width: 0px; display: none;" /></tr></thead></table></div><div class="el-table__body-wrapper is-scrolling-none"><table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 396px;"><colgroup><col name="el-table_2_column_6" width="80"><col name="el-table_2_column_7" width="158"><col name="el-table_2_column_8" width="158"></colgroup><tbody><tr class="el-table__row"><td rowspan="1" colspan="1" class="el-table_2_column_6  " style="height: 44px; padding: 2px 0px; background: rgb(252, 253, 254); text-align: left; color: rgb(102, 102, 102);"><div class="cell"><span>1</span></div></td><td rowspan="1" colspan="1" class="el-table_2_column_7  " style="height: 44px; padding: 2px 0px; background: rgb(252, 253, 254); text-align: left; color: rgb(102, 102, 102);"><div class="cell"><span>八达岭奥特莱斯</span></div></td><td rowspan="1" colspan="1" class="el-table_2_column_8  " style="height: 44px; padding: 2px 0px; background: rgb(252, 253, 254); text-align: left; color: rgb(102, 102, 102);"><div class="cell"><span>2</span></div></td></tr><!----></tbody></table><!----><!----></div><!----><!----><!----><!----><div class="el-table__column-resize-proxy" style="display: none;" /><div class="el-loading-mask" style="display: none;"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path" /></svg><!----></div></div></div><div data-v-3417ed67="" class="pagination-container hidden"><!----></div><!----></div></div></form>

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
.el-dialog .el-dialog__body .el-form-item {
    margin-bottom: 20px;
}
.el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    height: 36px;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    font-weight: normal;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
