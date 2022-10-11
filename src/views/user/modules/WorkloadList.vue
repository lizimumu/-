<template>
  <div class="search">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="人员搜索:">
        <el-input v-model="msg" placeholder="请输入" />
      </el-form-item>
      <div class="role">
        <el-form-item label="角色:">
          <el-select v-model="value" placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item></div>

      <el-form-item>
        <el-button icon="el-icon-search" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUserWorkListAPI } from '@/api/dmd_user'
export default {
  data() {
    return {
      msg: '',
      pageIndex: 1,
      pageSize: 10,
      renderList: [],
      formInline: {
        user: '',
        region: ''
      },
      value: '',
      options: [{
        value: '选项1',
        label: '运营员'
      }, {
        value: '选项2',
        label: '维修员'
      }]
    }
  },
  methods: {
    async onSubmit() {
      // console.log(getUserWorkListAPI({
      //   userName: this.msg,
      //   isRepair: this.options.label === '运营员' ? 'false' : 'true',
      //   pageIndex: this.pageIndex,
      //   pageSize: this.pageSize
      // }))
      const { data } = await getUserWorkListAPI({
        userName: this.msg,
        isRepair: this.options.label === '运营员' ? 'false' : 'true',
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      console.log(data)
      // const { currentPageRecords } = data
      this.renderList = data
      // console.log(currentPageRecords)
      this.$emit('renderList', this.renderList)
      this.msg = ''
      this.options.label = ''
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
    display: flex;
    width: 660px;
    height: 36px;
    font-size: 14px;
    color: #606266;
    label{
        font-weight: 400;
    }
    .el-input__inner{
     width: 206px;
     height: 36px;
    }
    .el-button{
      width: 80px !important;
      height: 36px;
      color:#fff;
      background-color: #5f84ff;
    }
  }
}
</style>
