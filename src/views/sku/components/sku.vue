<template>
  <div class="header">
    <div class="header-mian">
      <div class="mian">
        <p>商品搜索：</p>
        <el-input v-model="input" placeholder="请输入" style="width:205px;height: 36px;line-height: 36px;padding-right: 10px;" />
        <el-button icon="el-icon-search" class="btn-search" @click="skuquery">查询</el-button>
      </div>
      <div class="end">
        <div class="end-body">
          <div class="btncss">
            <el-button icon="el-icon-circle-plus-outline" class="btn-add" @click="handleAdd">新建</el-button>
            <el-button class="btn-addData" @click="btn_addData">导入数据</el-button>
          </div>
          <el-table
            :data="arr"
            style="width: 100%"
            :header-cell-style="{ background: '#f3f6fb', color: '#666' ,fontWeight:'400',fontSize:'14px'}"
            :row-style="{height:'0'}"
            :cell-style="{padding:'0'}"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
            />
            <el-table-column
              prop="skuName"
              label="商品名称"
              width="171"
            />
            <el-table-column align="center" prop="skuImage" label="商品图片" width="200">
              <template scope="scope">
                <img :src="scope.row.skuImage" width="24" height="24" border-radius="50%">
              </template>
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="品牌"
            />
            <el-table-column
              prop="unit"
              label="规格"
            />
            <el-table-column
              prop="price"
              label="商品价格"
            >
              <template slot-scope="scope"><span>{{ (scope.row.price) / 100 }}</span></template>
            </el-table-column>
            <el-table-column
              prop="skuClass.className"
              label="产品类型"
            />
            <el-table-column
              prop="createTime"
              label="创建日期"
            />
            <el-table-column
              prop="address"
              label="操作"
              width="100"
            >
              <template slot-scope="{ row }">
                <el-button type="text" @click="editRow(row)">修改</el-button>
              </template>

            </el-table-column>
          </el-table>
        </div>
        <div class="fengye">
          <p>共条记录{{ allArr.totalCount }} 第{{ allArr.pageIndex
          }} /{{ allArr.totalPage }}页</p>
          <div>
            <el-button>上一页</el-button>
            <el-button @click="page">下一页</el-button>
          </div>
        </div>
      </div>
    </div>
    <!--放置一个弹层组件-->
    <AddSku ref="AddSku" :dialog-visible.sync="dialogVisible" @skuSearch="skuSearch" />
    <!-- 点击导入组件 -->
    <btnaddData :btnadd-data.sync="btnaddData" />
  </div>
</template>

<script>
// skuSearchAPI商品搜索
import { skuSearchAPI } from '@/api/sku'
import AddSku from './AddSku.vue'// 点击新建
import btnaddData from './btnaddData'// 点击导入
export default {
  name: 'SKU',
  components: { AddSku, btnaddData },
  props: {},
  data() {
    return {
      input: '',
      arr: [],
      allArr: [],
      dialogVisible: false,
      btnaddData: false,
      price: ''
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.skuSearch()
  },
  methods: {
    async skuSearch() {
      const { data } = await skuSearchAPI()
      this.allArr = data
      console.log(this.allArr)
      this.arr = data.currentPageRecords
    },
    // 点击新建
    handleAdd() {
      this.dialogVisible = true
    },
    // 点击导入数据
    btn_addData() {
      this.btnaddData = true
    },
    // 点击修改
    async editRow(row) {
      this.dialogVisible = true
      this.$refs.AddSku.$data.form = { ...row }
      // console.log(this.$refs.AddSku.formData)// 点击当前的信息
    },
    // 点击查询
    async skuquery() {
      const res = await skuSearchAPI(1, 100, this.input)
      // console.log(res)
      this.arr = res.data.currentPageRecords
      // console.log(this.arr)// input输入的值然后匹配的结果
    },
    // 点击下一页
    page() {
      console.log(this.allArr.currentPageRecords)
    }	 }
}
</script>
<style lang="scss" scoped>
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
.header{
  background-color: #F8FAFD;
  .header-mian{
    padding: 20px;
  }
}
.mian{
  display: flex;
  align-items: center;
  background-color: #fff;
  height: 64px;
  p{
    font-size: 14px;
    color: #606266;
    padding: 0 12px 0 0;
    margin-left: 10px;
  }
}
.btn-search{
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 80px;
  height: 36px;
  padding: 0;
  background-color: #5f84ff;
  border: none;
  color: #fff;
}
.end{
margin-top: 50px;
background-color: #fff;
}
.btncss{
  display: flex;
}
.btn-add{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    color: #fff;
    margin-bottom:20px;
}
.btn-addData{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
}
.search-from{
    line-height: 1.15;
    padding: 10px 0px 9px;
    background: rgb(243, 246, 251);
    font-weight: 500;
    text-align: left;
    color: rgb(102, 102, 102);
}
.end-body{
  margin: 10px ;
}
.change{
    color: #5f84ff;
    padding-right: 20px;
  }
.el-table td, .el-table th.is-leaf{
  border-bottom: none;
}
.el-table::before {
height: 0;
}
.fengye{
  display: flex;
}
</style>
