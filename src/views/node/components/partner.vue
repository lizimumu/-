<template>
  <div class="container"><search title="合作商搜索" :num="2" @search="search" />
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
          label="合作名称"
        /> <el-table-column
          prop="account"
          label="账号"
        /> <el-table-column
          prop="vmCount"
          label="设备数量"
        />
        <el-table-column
          prop="ratio"
          label="分成比例"

          hight="44"
        />
        <el-table-column
          prop="contact"
          label="联系人"

          hight="44"
        />
        <el-table-column
          prop="mobile"
          label="联系电话"

          hight="44"
        />
        <el-table-column
          prop="date"
          label="操作"
          width="250"
        >
          <template slot-scope="{row,$index}">
            <el-button type="text" @click="open(row,$index)">重置密码</el-button>
            <el-button type="text" @click="examine(row,$index)">查看详情</el-button>
            <el-button type="text" @click="modify(row,$index)">修改</el-button>
            <el-button type="text" class="delete" @click="del(row)">删除</el-button>
          </template></el-table-column>
      </el-table>
      <!-- <Paginate v-if="!tableData.length==0" :data="data" @update-data="UpdateData" /> -->
      <!-- 查看详情 -->
      <el-dialog
        title="合作商详情"
        :visible.sync="dialogVisible"
        width="630px"
        :before-close="handleClose"
      >
        <div class="el-row"><div class="el-col el-col-12"><div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">合作商名称：</label><div class="el-form-item__content" style="margin-left: 140px;">
          {{ row.name }}
        </div></div></div><div class="el-col el-col-12"><div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">联系人：</label><div class="el-form-item__content" style="margin-left: 140px;">
          {{ row.contact }}
        </div></div></div><div class="el-col el-col-12"><div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">联系电话：</label><div class="el-form-item__content" style="margin-left: 140px;">
          {{ row.mobile }}
        </div></div></div><div class="el-col el-col-12"><div class="el-form-item"><label class="el-form-item__label" style="width: 140px;">分成比例：</label><div class="el-form-item__content" style="margin-left: 140px;">
          {{ row.ratio }}
        </div></div></div></div>

      </el-dialog>
      <!-- 修改合作商-->
      <ModifyPartner ref="Modify" :dialog-visible="flag" @close="close1" />
    </div></div>

</template>

<script>
import search from './cpns/search.vue'
// import Paginate from './cpns/Paginate'
import { CooperativeQuotientSearchAPI, DeletePartnerAPI, ResetPasswordAPI } from '@/api/partner'
import ModifyPartner from './cpns/ModifyPartner.vue'
export default {
  components: {
    search,
    ModifyPartner
  },
  data() {
    return {
      row: {},
      flag: false,
      dialogVisible: false,
      pageIndex: 1,
      pageSize: 10,
      tableData: []
    }
  },
  created() {
    this.CooperativeQuotientSearch()
  },
  methods: {
    async CooperativeQuotientSearch() {
      const { data } = await CooperativeQuotientSearchAPI(this.pageIndex, this.pageSize)
      console.log(data)
      data.currentPageRecords.forEach(item => {
        item.ratio += '%'
      })

      this.tableData = data.currentPageRecords
    },
    examine(row) {
      this.dialogVisible = true
      console.log(row)
      this.row = row
    },
    modify(row) {
      this.flag = true
      row.ratio = row.ratio.slice(0, row.ratio.length - 1)
      this.$refs.Modify.data = { ...row }
    },
    close1() {
      console.log(5858582852)
      this.flag = false
      this.CooperativeQuotientSearch()
    },
    async  del(row) {
      try {
        const data = await DeletePartnerAPI(row.id, this.pageIndex, this.pageSize, row.name)
        console.log(data)
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
        this.CooperativeQuotientSearch()
      } catch (err) {
        this.$notify({
          title: '提示',
          message: err.response.data,
          type: 'warning'
        })
      }
    },
    open(row) {
      this.$confirm('', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,

        title: '确定要重置合作商密码吗？'
      }).then(() => {
        ResetPasswordAPI(row.id)
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
      }).catch(() => {

      })
    },
    search(data) {
      this.tableData = data.currentPageRecords
    },
    newBuilt() {
      this.flag = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    UpdateData() {

    }
  }
}
</script>
<style lang='scss'>
.el-message-box__status::before {
    padding-left: 1px;
    color: red;
}
.el-message-box--center {
  width: 300px;
    padding-bottom: 30px;
}
.el-button--primary {
    color: #FFF;
    background-color: #5f84ff;
    border-color: #409EFF;
}
.el-message-box__title {
    padding-left: 0;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1;
    color: #303133;
}
</style>
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
