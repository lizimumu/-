<template>
  <div class="container"><search title="工单编号" title1="工单状态" :num="4" :options="options" @search="search" />
    <div class="result">
      <el-row>
        <el-col :span="24"><div class="operation "><el-button class="add" type="warning" size="medium" @click="newBuilt"> <span class="iconfont icon-xinjian" />新建</el-button><div /></div></el-col>
      </el-row> <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
        :row-style="{ height:'44px' }"
        :header-cell-style="{background:'#f3f6fb',fontSize:'14px', color:'#666666',fontWeight:'400', height:'44px !important' ,}"
      >
        <el-table-column
          type="index"
          label="序号"
          width="80"
        />
        <el-table-column
          prop="taskCode"
          label="工单编号"
        /> <el-table-column
          prop="innerCode"
          label="设备编号"
        /> <el-table-column
          prop="taskType.typeName"
          label="工单类型"
        />
        <el-table-column
          prop="createType"
          label="工单方式"

          hight="44"
        />
        <el-table-column
          prop="taskStatusTypeEntity.statusName"
          label="工单状态"

          hight="44"
        />
        <el-table-column
          prop="userName"
          label="运维人员"

          hight="44"
        />
        <el-table-column
          prop="createTime"
          label="创建日期"

          hight="44"
        />
        <el-table-column
          prop="date"
          label="操作"
          width="100"
        >
          <template slot-scope="{row,$index}">
            <el-button type="text" @click="examine(row,$index)">查看详情</el-button>
          </template></el-table-column>
      </el-table>
      <Paginate v-if="!tableData.length==0" :data="data" @update-data="UpdateData" />
      <!-- 查看详情 -->
      <AddWorkOrder :dialog-visible="dialogVisible" />
    </div></div>

</template>

<script>
import search from '../../node/components/cpns/search.vue'
import Paginate from '../../node/components/cpns/Paginate.vue'
import { getJobSearchAPI, getAllTaskStatusAPI } from '@/api/task'
import AddWorkOrder from './cpns/Addworkorder.vue'
export default {
  components: {
    search,
    Paginate,
    AddWorkOrder
  },
  data() {
    return {
      tableData: [],
      list: {
        pageIndex: 0,
        pageSize: 10,
        isRepair: true
      },
      dialogVisible: false,
      data: {},
      options: []
    }
  },
  created() {
    this.getJobSearch()
    this.getAllTaskStatus()
  },
  methods: {

    async getAllTaskStatus() {
      const { data } = await getAllTaskStatusAPI()
      console.log(data)
      this.options = data
    },
    async   getJobSearch() {
      try {
        const { data } = await getJobSearchAPI(this.list)
        this.data = data
        data.currentPageRecords.forEach(item => {
          if (item.createType === 0) {
            item.createType = '自动'
          }
          if (item.createType === 1) {
            item.createType = '手动'
          }
          item.createTime = item.createTime.replace('T', ' ')
        })
        this.tableData = data.currentPageRecords
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
    search(data) {
      this.tableData = data.currentPageRecords
      this.data = data
    },
    newBuilt() {
      this.dialogVisible = true
    },
    async  UpdateData(num) {
      console.log(num)
      if (num === 1) {
        this.list.pageIndex--
      } if (num === 2) {
        this.list.pageIndex++
      }

      await this.getJobSearch()
    },
    examine() {

    }
  }
}
</script>

<style scoped lang='scss'>
.container{
padding-left: 20px;

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
 ::v-deep .el-dialog .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
      padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
 ::v-deep .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    font-weight: normal;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.result{

padding: 20px 15px 19px 17px;
background-color: #fff;
.operation{
margin-bottom: 20px;
height: 36px; margin-left: 0px ;

.add{
padding-top: 8px ;
background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
border-radius: 4px;
width: 80px; font-size: 14px;
 color: #fff;
vertical-align: middle;
    // padding-left: 30px;
height: 36px;
span{
margin-right: 8px;
margin-left: -8px !important;
vertical-align: middle;
font-size: 18px;
}
}
}}
.table{
  .delete{
    color: red;
  }
}
::v-deep .el-dialog__header {
    background: #fff;
     border-radius: 20px !important;

}
::v-deep .el-dialog__header .el-dialog__title {
      font-size: 16px !important;
         font-weight: 600;
}
::v-deep .el-dialog{
  border-radius: 10px;
}
.el-col-12 {
    width: 50%;
    height: 36px;
}
::v-deep .el-dialog__body {
    padding: 30px 20px ;
    color: #606266;
    font-size: 14px;
    padding-top: 10px !important;
    word-break: break-all;
}
::v-deep  .el-dialog__header .el-dialog__title {
    color: #333;
}
::v-deep .el-dialog__header .el-icon-close:before {
    color: #333;
}

</style>
