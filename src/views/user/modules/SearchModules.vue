<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="人员搜索:">
        <el-input v-model="msg" placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { searchUserAPI } from '@/api/dmd_user'
export default {
  data() {
    return {
      msg: '',
      pageSize: 10,
      pageIndex: 1,
      formInline: {
        user: '',
        region: ''
      },
      newList: []
    }
  },
  methods: {
    async onSubmit() {
      const { data: { currentPageRecords }} = await searchUserAPI(this.msg, this.pageIndex, this.pageSize)
      this.newList = currentPageRecords
      this.$emit('search-list', this.newList)
      this.msg = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  width: 1713px;
  height: 64px;
  padding-left:20px ;
  .el-form{
    width: 388px;
    height: 36px;
    .el-input__inner{
     width: 206px;
     height: 36px;
    }
    .el-button{
      width: 80px;
      height: 36px;
      color:#fff;
      background-color: #5f84ff;
    }
  }

}
</style>
