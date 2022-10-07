<template>
  <div class="container"><search title="区域搜索" :num="1" @search="search" />
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
          prop="name"
          label="区域名称"
        />
        <el-table-column
          prop="nodeCount"
          label="点位数"

          hight="44"
        />
        <el-table-column
          prop="name"
          label="备注说明"
        /> <el-table-column
          prop="date"
          label="操作"
          width="180"
        > <template slot-scope="{row,$index}">
          <el-button type="text" @click="examine(row,$index)">查看详情</el-button>
          <el-button type="text" @click="modify(row,$index)">修改</el-button>
          <el-button type="text" class="delete" @click="del(row)">删除</el-button>
        </template></el-table-column>
      </el-table>
      <Paginate v-if="!tableData.length==0" :data="data" @update-data="UpdateData" />  <ViewDetails ref="view" :dialog-visible="dialogVisible" @close="close" />
      <NewArea ref="area" :dialog-visible="flag" @closes="closes" /></div></div>

</template>

<script>
import search from './cpns/search.vue'
import { getAreaListAPI, GetDetailsAPI, RemoveArea } from '@/api/node'
import ViewDetails from './cpns/Viewdetails.vue'
import Paginate from './cpns/Paginate'
import NewArea from './cpns/Newarea.vue'
export default {
  components: {
    search,
    Paginate,
    ViewDetails,
    NewArea
  },
  data() {
    return {
      dialogVisible: false,
      flag: false,
      data: {},
      pageIndex: 1,
      pageSize: 10,
      tableData: []

    }
  },
  created() {
    this.getAreaList()
  },
  methods: {
    async  getAreaList() {
      const { data } = await getAreaListAPI(this.pageIndex, this.pageSize)
      console.log(data)
      this.tableData = data.currentPageRecords
      this.data = data
    },
    UpdateData(num) {
      if (num === 1) {
        this.pageIndex--
      } if (num === 2) {
        this.pageIndex++
      }
      this.getAreaList()
    },
    async  examine(row, index) {
      this.dialogVisible = true
      const { data } = await GetDetailsAPI(this.pageIndex, this.pageSize, null, row.id)
      console.log(data)
      console.log(row)
      this.$refs.view.title = row.name
      this.$refs.view.tableData = data.currentPageRecords
    },
    modify(row, index) {
      console.log(row)

      this.$refs.area.ruleForm.id = row.id
      this.$refs.area.ruleForm.regionName = row.name
      this.$refs.area.ruleForm.remark = row.remark
      this.flag = true
    },
    async   del(row) {
      try {
        const data = await RemoveArea(row.id)
        console.log(data)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
      } catch (err) {
        this.$notify({
          title: '提示',
          message: err.response.data,
          type: 'warning'
        })
      }
    },
    close() {
      this.dialogVisible = false
    },
    search(data) {
      this.data = data
      this.tableData = data.currentPageRecords
    },
    closes() {
      this.flag = false
    },
    newBuilt() {
      this.flag = true
    }
  }
}
</script>

<style scoped lang='scss'>
.container{
padding-left: 20px;

}
::v-deep .el-notification__icon::before{
  color: red !important;
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
width: 80px;
 font-size: 14px;
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
}

}
.table{
  .delete{
    color: red;
  }
}
</style>
