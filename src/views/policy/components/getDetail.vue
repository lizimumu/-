<template>
  <div class="policy-container">
    <el-dialog title="策略详情" :visible.sync="dialogVisible" width="630px" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="策略名称：">
          <span>九折优惠</span>
        </el-form-item>
        <el-form-item label="活动区域：" class="activeArea">
          <span>
            <el-table :data="gridData" :header-cell-style="{background:'#f3f6fb'}" :row-style="{height:'43px'}">
              <el-table-column
                label="序号"
                type="index"
                width="50px"
              />
              <el-table-column
                label="点位名称"
                property="nodeName"
              />
              <el-table-column property="innerCode" label="设备编号" width="150px" />
            </el-table>
          </span>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <div class="pagination">
          <div class="pagination__total">
            <control-page
              :total-count="policyDetailList.totalCount"
              :total-page="policyDetailList.totalPage"
              :page-index="policyDetailList.pageIndex"
              :policy-id="policyId"
              @toPrevPolicy="toPrevPolicy"
              @toNextPolicy="toNextPolicy"
            />
          </div>
        </div>
      </div></el-dialog>

  </div>
</template>

<script>
import ControlPage from '@/components/controlPage/index.vue'

export default {
  components: {
    ControlPage
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    policyDetailList: {
      type: Object,
      default: () => ({})
    },
    policyId: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      gridData: [],
      form: {
      },
      totalCount: 0
    }
  },
  created() {
    this.gridData = this.policyDetailList.currentPageRecords
    console.log(this.gridData)
  },
  methods: {
    toPrevPolicy() {
      this.$emit('toPrevPolicy')
      console.log(55)
    },
    toNextPolicy() {
      this.$emit('toNextPolicy', this.policyId)
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style  lang="scss">
.policy-container {
.el-dialog__header {
  background-color: #fff !important;
.el-dialog__title {
  color: #333;
  font-size: 16px;
  font-weight: 700;
}
}
.el-form-item__label {
font-weight: 400;
}
.activeArea {
  display: flex;
  th,tr,td {
  background-color:#fcfdfe;
  border: 0;
}
}
.el-form-item__content {
  width: 396px;
}
.el-dialog__body {
padding: 50px;
padding-bottom: 0px;
}
.dialog-footer {
    // background: #fff;
    padding: 32px 16px;
    padding-top: 0;
    padding-left: 110px;
    white-space: nowrap;
    .pagination {
 padding: 2px 5px;
    color: #333;
    width: 396px;
    line-height: 36px;
    font-size: 14px;
    }
.pagination__total {
      display: flex;
    font-size: 13px;
    min-width: 35.5px;
    height: 40px;
    line-height: 38px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    flex: 1;
    font-size: 16px!important;
    color: #dbdfe5!important;
    margin-right: 10px;
}
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
}
}
.el-table {
  position: relative;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    font-size: 14px;
    color: #606266;}
}
.el-dialog__header .el-icon-close:before {
    color: #999;
}
</style>
