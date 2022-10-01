<template>
  <div><div class="search">
    <label class="el-form-item__label">区域搜索：</label><el-input v-model="input" size="medium" class="input" placeholder="请输入" />
    <el-button class="but" type="primary" size="small">
      <span class="iconfont icon-sousuo" />
      查询</el-button>
  </div></div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }

}
</script>

<style lang="scss" scoped>

.search{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 64px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    .input{
      width: 206px;
       height: 36px !important;
    line-height: 36px;

    }
      .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
   font-weight: 400;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.but{
  margin-left: 10px;
      background-color: #5373e0;
      border-radius: 4px;
      width: 80px;
      font-size: 14px;
      color: #fff;
      span{
        margin-right: 3px;
        margin-left: -2px;
        vertical-align: middle;
      }
}
}

</style>
