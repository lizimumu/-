<template>
  <div>
    <el-table

      :header-cell-style="{background:'#f3f6fb',fontSize:'14px', color:'#666666',fontWeight:'400', height:'44px !important' ,}"
      :data="newList"
      style="width: 100%"
    >
      <!-- <el-table-column
        type="index"
        label="序号"
        width="180"
      /> -->
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
        prop="regionName"
        label="归属区域"
        width="180"
      />
      <el-table-column
        prop="role.roleName"
        label="角色"
      />
      <el-table-column
        prop="mobile"
        label="联系电话"
        width="180"
      />
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <div class="aaa">
            <span class="edit" @click="edit(row)">修改</span>
            <span class="del" @click="del(row)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <OneDialog :is-show.sync="isShow" :user-info="userInfo" />
  </div>
</template>

<script>
import OneDialog from './OneDialog.vue'
import { delUserAPI } from '@/api/dmd_user'
export default {
  components: { OneDialog },
  props: {
    newList: {
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
      currentPage: null,
      pageSize: 10,
      isShow: false,
      userInfo: {},
      renderList: []
    }
  },
  methods: {
    getIndex($index) {
      // 表格序号
      return +(this.index - 1) * this.pageSize + $index + 1
    },
    edit(a) {
      this.isShow = true
      console.log(a)
      this.userInfo = a
      console.log(this.userInfo.role.roleName)
    },
    async del(a) {
      try {
        const { status, statusText } = await delUserAPI(a.id)
        console.log(status, statusText)
        if (status === 200 && statusText === 'OK') {
          this.$message({
            showClose: true,
            message: '系统演示不能删除',
            type: 'warning'
          })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit {
    display: block;
    margin-right:5px;
    width: 28px;
    height: 20px;
    font-size: 14px;
    color:#5f84ff;
    cursor:pointer;
}
.del{
    font-size: 14px;
    color:#fe5a9e;
     cursor:pointer;
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
.aaa{
    display: flex !important;
}
.el-table thead{
    background-color: #f3f6fb;
}
</style>
<style lang="scss" >

</style>
