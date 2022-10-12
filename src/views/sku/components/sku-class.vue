<template>
  <div class="header">
    <div class="header-mian">
      <div class="mian">
        <p>商品类型搜索：</p>
        <el-input v-model="input" placeholder="请输入" style="width:205px;height: 36px;line-height: 36px;padding-right: 10px;" />
        <el-button icon="el-icon-search" class="btn-search" @click="submit">查询</el-button>
      </div>
      <div class="end">
        <div class="end-body">
          <el-button icon="el-icon-circle-plus-outline" class="btn-add" @click="handleAdd">新建</el-button>

          <el-table
            :data="arr"
            :row-style="{height: '0'}"
            :cell-style="{padding: '0'}"
            :header-cell-style="{ background: 'rgb(243, 246, 251)', color: '#666' ,fontWeight:'400'}"
            style="width: 100%;"
          >
            <el-table-column
              type="index"
              label="序号"
              width="80"
            />
            <el-table-column
              prop="className"
              label="商品类型名称"
            />
            <el-table-column
              width="150"
              label="操作"
            >
              <template slot-scope="{ row }">
                <el-button type="text" size="small" class="change" @click="editRow(row)"> 修改</el-button>
                <el-button
                  type="text"
                  size="small"
                  class="delete"
                  @click="delRow"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
    </div>
    <!--放置一个弹层组件-->
    <AddSkuClass ref="AddSkuClass" :show-dialog.sync="showDialog" @skuClassSearch="skuClassSearch" />
  </div>
</template>

<script>
// skuClassSearchAPI类型搜索
import { skuClassSearchAPI } from '@/api/sku'
import AddSkuClass from './AddSkuClass'
export default {
  name: 'SKUCLASS',
  components: { AddSkuClass },
  props: {},
  data() {
    return {
      input: '',
      arr: [],
      showDialog: false,
      row: {}
    }
  },
  computed: {},
  watch: {},
  // 生命周期 - 创建完成（访问当前this实例）
  created() {
    this.skuClassSearch()
  },
  methods: {
    async skuClassSearch() {
      const { data } = await skuClassSearchAPI()
      this.arr = data.currentPageRecords
      // console.log(this.arr)
    },
    // 点击删除
    delRow() {
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning'
      })
    },
    // 点击修改
    async editRow(row) {
      // console.log(row)
      this.showDialog = true
      this.$refs.AddSkuClass.shopForm = { ... row }
      // console.log(this.$refs.AddSkuClass)
    },
    handleAdd() {
      this.showDialog = true
    },
    // 点击查询
    async submit() {
      const res = await skuClassSearchAPI(1, 100000, this.input)
      console.log(res)
      this.arr = res.data.currentPageRecords
      console.log(this.arr)
    }

  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__header .el-icon-close:before {
color: #333;
}
::v-deep .label{
	font-weight: 400;
}
::v-deep .el-dialog__title {
line-height: 24px;
font-size: 16px;
color: #303133;
font-weight: 700;
}
::v-deep .el-dialog__body {
padding: 30px 40px;
color: #606266;
font-size: 14px;
word-break: break-all;
}
::v-deep .el-dialog{
border-radius: 10px;
}
::v-deep .el-dialog__header{
 background-color: #fff;
 border-radius: 10px
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
.btn-add:hover {
  color: #fff;
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

    font-size: 14px;
  }
  .delete{
    color: #ff5a5a;

    font-size: 14px;
  }

.el-table td, .el-table th.is-leaf{
  border-bottom: none;
}
.el-table::before {
height: 0;
}
.el-table .cell{
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  color: rgb(102, 102, 102) !important;
  font-weight:500;
}
.el-table thead {
    color: #909399;
    font-weight: 500;
    }
.quxiao{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
    font-size: 14px;
    margin-left: 200px;
}
.queren{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    font-size: 14px;
    color: #fff;
}
</style>
