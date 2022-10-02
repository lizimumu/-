<template>
  <div class="pagination-container"><div class="total"><div class="left">共{{ data.totalCount }}条记录 第 {{ data.pageIndex }}/{{ data.totalPage }} 页</div><div class="right">
    <el-button type="info" size="small" class="btn" :disabled="data.pageIndex == 1" :class="{bgc:data.pageIndex == 1}" @click="previousPage">上一页</el-button>
    <el-button class="btn" size="small" :disabled="data.pageIndex == data.totalPage " :class="{bgc:data.pageIndex == data.totalPage}" type="info" @click="nextPage">下一页
    </el-button></div></div></div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  methods: {
    previousPage() {
      this.$emit('update-data', 1)
    },
    nextPage() {
      this.$emit('update-data', 2)
    }
  }
}
</script>

<style scoped lang='scss'>
.bgc{
  background-color: #f1f3f4 !important;
  color:#d8dde3 !important ;
}
.pagination-container {

    padding: 32px 16px;
    height: 96px;
    .total{
      width: 100%;
      height: 32px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      .left{
        font-size: 16px;
        color: #dbdfe5;
      }
      .right{
        .btn{
          background-color:#d5ddf8;
          border: 0;
          color: #333;
          margin: 0 16px;font-size: 13px;
          width: 70px;
        }
      }
    }}
</style>
