<template>
  <div class="policy-container">
    <el-dialog title="策略详情" :visible.sync="dialogVisible" width="630px">
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
                property="name"
              />
              <el-table-column property="address" label="设备编号" width="150px" />
            </el-table>
          </span>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <span>共{{ totalCount }}条记录</span>
        <span>第{{ pageIndex }}/{{ totalPage }}页</span>
        <el-button @click="dialogVisible = false">上一页</el-button>
        <el-button type="primary" @click="dialogVisible = false">下一页</el-button>
      </div>
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
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '629px'
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
}
}

</style>
