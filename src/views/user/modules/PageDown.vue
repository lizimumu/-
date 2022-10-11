<template>
  <div class="block">
    <div class="one">
      <span class="one-one">共{{ totalCount }}条记录</span>
      <span> 第{{ pageIndex }}/{{ totalPage }}页</span>
    </div>

    <el-pagination
      v-if="totalPage>0"
      background
      :current-page.sync="pageIndex"
      layout="prev,next"
      :total="totalCount"
      next-text="下一页"
      prev-text="上一页"
      @next-click="next"
      @prev-click="prev"
    />

  </div>
</template>

<script>

export default {
  data() {
    return {
      changePageIndex: 0,
      totalCount: 0,
      pageSize: 0,
      pageIndex: 0,
      totalPage: 0
    }
  },
  created() {
    this.changePageIndex = this.pageIndex
  },
  methods: {
    one(a, b, c, d) {
      console.log(a, b, c, d)
      this.totalCount = a
      this.pageSize = b
      this.totalPage = c
      this.pageIndex = d
    },
    next() {
      // 点击下一页
      // console.log('next', this.pageIndex + 1)
      this.$emit('nextPageIndex', this.pageIndex + 1)
    },
    prev() {
      // 点击上一页
      // console.log('prev', this.pageIndex - 1)
      this.$emit('nextPageIndex', this.pageIndex - 1)
    }
  }
}

</script>

<style lang="scss" scoped>
.block{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 96px;
    padding: 32px 16px;
    .one{
        width: 1431px;
        height: 28px;
        span{
            font-size: 16px!important;
            color: #dbdfe5!important;
        }
        .one-one{
            margin-right: 4px;
        }
    }
     .el-button{
        width: 70px;
        height: 32px;
        color:#000;
        background-color: #d5ddf8;
        span {
        font-size: 16px;
        }
    }
    .el-button:hover{
        color:#000;
        background-color: #d5ddf8;
    }
}
::v-deep .btn-next {
width: 70px;
height: 32px;
margin: 0 16px;
background-color: #d5ddf8 !important;
}
::v-deep .btn-prev{
  width: 70px;
height: 32px;
margin: 0 16px;
background-color: #d5ddf8 !important;
}
</style>
