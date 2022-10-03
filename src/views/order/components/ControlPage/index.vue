<template>
  <div>
    <div v-if="isShowPage" class="pagination__total">

      <div>
        <span>共{{ page.totalCount }}条记录</span>
        <span>第{{ page.pageIndex }}/ {{ page.totalPage }}页</span>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="page.pageIndex"
        :page-size.sync="page.totalPage"
        @current-change="toPrevPolicy"
        @size-change="toPrevPolicy"
      />

    </div>
  </div>
</template>

<script>
export default {
  props: {
    pageIndex: {
      type: [String, Number],
      default: 0
    },
    totalPage: {
      type: [String, Number]

    },
    totalCount: {
      type: [String, Number]

    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      page: {
        totalCount: 0,
        pageIndex: 0,
        totalPage: 0
      },
      isShowPage: false
    }
  },
  created() {
    this.page.pageIndex = +this.pageIndex
    this.page.totalCount = +this.totalCount
    this.page.totalPage = +this.totalPage
    if (+this.totalCount === 0) {
      this.isShowPage = false
    } else {
      this.isShowPage = true
    }

    // console.log(this.page.pageIndex)
  },
  methods: {
    toPrevPolicy() {
      this.$emit('toPrevPolicy', this.page.pageIndex)
    }
  }
}
</script>

<style>
.pagination__total {
  margin-top: 20px;
      display: flex;
      justify-content: space-between;
    font-size: 13px;
    min-width: 35.5px;
    height: 40px;
    line-height: 38px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    flex: 1;
    font-size: 16px!important;
    color: #dbdfe5!important;
    margin-right: 10px;
}
    .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
}
</style>
