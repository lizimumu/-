<template>
  <div class="container"><search title="点位搜索" :num="3" title1="合作商搜索" :options="Options" @search="search" />
    <div class="result">
      <el-row>
        <el-col :span="24"><div class="operation "><el-button class="add" type="warning" size="medium" @click="newBuilt"> <span class="iconfont icon-xinjian" />新建</el-button><div /></div></el-col>
      </el-row> <el-table
        class="table"
        :data="tableData"
        style="width: 100%"
        :row-style="{ height:'44px' }"
        :header-cell-style="{background:'#f3f6fb',fontSize:'14px', color:'#666666',fontWeight:'400', height:'42px' ,}"
      >
        <el-table-column
          type="index"
          label="序号"
        />
        <el-table-column
          prop="name"
          label="点位名称"
        />  <el-table-column
          prop="region.name"
          label="所在区域"
        />
        <el-table-column
          prop="businessType.name"
          label="商圈类型"

          hight="44"
        />
        <el-table-column
          prop="ownerName"
          label="合作商"

          hight="44"
        />
        <el-table-column
          prop="addr"
          label="详细地址"

          hight="44"
        />
        <el-table-column
          prop="date"
          label="操作"
          width="200"
        >
          <template slot-scope="{row,$index}">
            <el-button type="text" @click="examine(row,$index)">查看详情</el-button>
            <el-button type="text" @click="modify(row,$index)">修改</el-button>
            <el-button type="text" class="delete" @click="del(row)">删除</el-button>
          </template></el-table-column>
      </el-table>
      <Paginate v-if="!tableData.length==0" :data="data" @update-data="UpdateData" />
      <!-- 查看详情 -->
      <Pointdetails ref="visible" :dialog-visible="visible" @close="close" />
      <!-- 新增点位 -->
      <Newpoint ref="newPoint" :dialog-visible="dialogVisible" @close="close2" />
    </div></div>
</template>

<script>
import search from './cpns/search.vue'
import { getAreaListAPI, PointSearchElementAPI, DeletePointAPI, PointDetailsAPI } from '@/api/node'
import Paginate from './cpns/Paginate'
import Pointdetails from './cpns/Pointdetails.vue'
import Newpoint from './cpns/Newpoint.vue'
export default {
  components: {
    search,
    Paginate,
    Pointdetails,
    Newpoint
  },
  data() {
    return {
      dialogVisible: false,
      pageIndex: 1,
      pageSize: 10,
      tableData: [],
      Options: [],
      data: {},
      visible: false
    }
  },
  created() {
    this.getAreaList()
    this.PointSearchElement()
  },
  methods: {
    async  getAreaList() {
      const { data } = await getAreaListAPI(this.pageIndex, 100000000)
      // console.log(data)
      this.Options = data.currentPageRecords
      // this.data = data
    },
    async PointSearchElement() {
      const { data } = await PointSearchElementAPI(this.pageIndex, this.pageSize)

      data.currentPageRecords.forEach(item => {
        const arr = item.addr.split('-')
        arr.splice(arr.length - 1, 1)
        // this.$set(item, 'value', arr.join('/'))
        // this.$set(item, 'addr', item.addr.split('-').at(-1))
        item.value = arr.join('/')
        item.addr = item.addr.split('-').at(-1)
      })
      this.data = data
      this.tableData = data.currentPageRecords
    },
    async  UpdateData(num) {
      console.log(num)
      if (num === 1) {
        this.pageIndex--
      } if (num === 2) {
        this.pageIndex++
      }

      await this.PointSearchElement()
    },
    search(data) {
      this.data = data
      data.currentPageRecords.forEach(item => {
        const arr = item.addr.split('-')
        arr.splice(arr.length - 1, 1)
        // this.$set(item, 'value', arr.join('/'))
        // this.$set(item, 'addr', item.addr.split('-').at(-1))
        item.value = arr.join('/')
        item.addr = item.addr.split('-').at(-1)
      })
      this.tableData = data.currentPageRecords
    }, newBuilt() {
      this.$refs.newPoint.getData()
      this.dialogVisible = true
    },
    async del(row) {
      try {
        const data = await DeletePointAPI(row.id, this.pageIndex, this.pageSize, row.name)
        console.log(data)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'

        })
        this.PointSearchElement()
      } catch (err) {
        this.$notify({
          title: '提示',
          message: err.response.data,
          type: 'warning'
        })
      }
    },
    async examine(row) {
      const { data } = await PointDetailsAPI(row.id)

      data.forEach((item) => {
        item.lastSupplyTime = item.lastSupplyTime.replace('-', '.').replace('T', ' ')
        if (item.vmStatus === 0) item.vmStatus = '未投放'
        if (item.vmStatus === 1) item.vmStatus = '运营'
        if (item.vmStatus === 3) item.vmStatus = '撤机'
      })
      this.$refs.visible.tableData = data
      this.visible = true
    },
    modify(row) {
      console.log(row)
      this.$refs.newPoint.getData()
      this.$refs.newPoint.ModifyData(row)
      this.dialogVisible = true
    },
    close() {
      this.visible = false
    },
    close2() {
      this.dialogVisible = false
    }
  }
}
</script>
<style>

.el-table::before{
    background-color: transparent ;
}
.el-table__header-wrapper {
    overflow: hidden;
  background-color: #fff;
}

 .el-table td{
border-bottom: none;
height: 44px !important;
padding: 0px !important;
}
 .el-table tbody tr:hover>td { border-radius: 5px;}
 .el-table th.is-leaf {
    border-bottom: none;
    height: 44px;

}</style>
<style scope lang='scss'>
.container{
padding-left: 20px;

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
     padding-left: 30px;
vertical-align: middle;
height: 36px;

span{
margin-right: 8px;
margin-left: -8px !important;
vertical-align: middle;
font-size: 14px;
}
.icon-xinjian:before {
   font-size: 18px;
}
}
}}
.table{
  .delete{
    color: red;
  }
}

</style>
