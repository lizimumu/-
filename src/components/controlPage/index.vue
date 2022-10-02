<template>
  <div class="control_page_policy">
    <div class="pagination__total">
      <span>共{{ totalCount }}条记录</span>
      <span>第{{ pageIndex }}/ {{ totalPage }}页</span>
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="page.page"
        :page-size.sync="page.pageTotal"
        :page-sizes="[2,5,10,15]"
        @next-click="toNextPolicy"
        @prev-click="toPrevPolicy"
      />
    </div>

  </div>
</template>

<script>
export default {
  props: {
    totalCount: {
      type: [String, Number],
      default: 0
    },
    pageIndex: {
      type: [String, Number],
      default: 0
    },
    totalPage: {
      type: [String, Number],
      default: 0
    }

  },
  data() {
    return {
      page: {
        page: this.pageIndex,
        pageTotal: this.totalPage
      }
    }
  },
  methods: {
    toPrevPolicy() {
      this.pageIndex !== 1 || this.$emit('toPrevPolicy')
    },
    toNextPolicy() {

    }
  }
}
</script>

<style scoped lang="scss">

</style>
