<template>
  <div class="container"><search /><div class="result"><el-row>
    <el-col :span="24"><div class="operation "><el-button class="add" type="warning" size="medium"> <span class="iconfont icon-xinjian" />新建</el-button><div /></div></el-col>
  </el-row> <el-table
    class="table"
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{background:'#f3f6fb',fontSize:'16px', color:'#666666',borderRadius:'5px' ,fontWeight:'400', height:'42px' ,padding:'10px 0 9px'}"
  >
    <el-table-column
      type="index"
      label="序号"
      width="80"
    />
    <el-table-column
      prop="name"
      label="区域名称"
      width="444"
    />
    <el-table-column
      prop="address"
      label="点位数"
      width="443"
    />
    <el-table-column
      prop="date"
      label="备注说明"
      width="443"
    /> <el-table-column
      prop="date"
      label="操作"
      width="200"
    > <template>
      <el-button type="text">查看详情</el-button>
      <el-button type="text">修改</el-button>
      <el-button type="text" class="delete">删除</el-button>
    </template></el-table-column>
  </el-table> </div></div>

</template>

<script>
import search from './cpns/search.vue'
export default {
  components: {
    search
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>

<style scoped lang='scss'>
.container{
padding-left: 20px;

}
::v-deep .el-table td{
border-bottom: none;
}
 ::v-deep .el-table tbody tr:hover>td { border-radius: 5px;}
::v-deep .el-table th.is-leaf {
    border-bottom: none;

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
