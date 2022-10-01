<template>
  <div class="container"><search /><div class="result"><el-row>
    <el-col :span="24"><div class="operation "><el-button class="add" type="warning" size="medium">  <span class="iconfont icon-xinjian" />新建</el-button><div /></div></el-col>
  </el-row>  <template>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </template>
  </div></div>

</template>

<script>
import search from './cpns/search.vue'
export default {
  components: {
    search
  },
  data() {
    [{
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
</script>

<style scoped lang='scss'>
.container{
padding-left: 20px;

}
.result{
  padding: 20px 15px 19px 17px;
    background-color: #fff;
    .operation{
      margin-bottom: 20px;
      height: 36px;
      margin-left: 0px ;
      .add{
padding-top: 8px ;
background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
      border-radius: 4px;
      width: 80px;
      font-size: 14px;
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
</style>
