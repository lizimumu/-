<template>
  <div>
    <el-table

      :header-cell-style="{background:'#f3f6fb',fontSize:'14px', color:'#666666',fontWeight:'400', height:'44px !important' ,}"
      :data="tableList"
      style="width: 100%"
    >
      <el-table-column label="序号">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)" />
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="人员名称"
      />
      <el-table-column
        prop="roleName"
        label="角色"
      />
      <el-table-column
        prop="mobile"
        label="联系电话"
        width="180"
      />
      <el-table-column
        prop="workCount"
        label="完成工单（本月）"
        width="180"
      />
      <el-table-column
        prop="progressTotal"
        label="进行中工单（本月）"
        width="180"
      />
      <el-table-column
        prop="cancelCount"
        label="拒绝工单（本月）"
        width="180"
      />
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <span class="look" @click="look(row)">查看详情</span>
        </template>
      </el-table-column>
    </el-table>
    <DetailsDialog :is-show.sync="isShow" :click-user-info="clickUserInfo" />
  </div>
</template>

<script>
import DetailsDialog from '../modules/DetailsDialog.vue'
export default {
  components: {
    DetailsDialog
  },
  props: {
    tableList: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      isShow: false,
      clickUserInfo: {}
    }
  },
  methods: {
    getIndex($index) {
      // 表格序号
      return +(this.index - 1) * this.pageSize + $index + 1
    },
    look(row) {
      this.clickUserInfo = row
      // console.log(this.clickUserInfo)
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.look{
    color:#8184ff;
    cursor: pointer;
}
::v-deep .el-table::before{
 background-color: transparent;
}
::v-deep .el-table td{
border-bottom: none;
height: 44px !important;
padding: 0px !important;
}
::v-deep .el-table tbody tr:hover>td { border-radius: 5px;}
::v-deep .el-table th.is-leaf {
 border-bottom: none;
 height: 44px;

}
::v-deep .cell{
    display: flex;
}
::v-deep .el-table thead{
    background-color: #f3f6fb;
}
</style>

