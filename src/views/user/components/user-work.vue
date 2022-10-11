<template>
  <div>
    <div class="one">
      <WorkloadList @renderList="renderList" />
    </div>
    <div class="two">
      <WorkListTable :table-list="tableList" :index="changeIndex" />
      <PageDown ref="page" @nextPageIndex="changePageIndex" />
      <!-- <PageDown :total-count="totalCount" :page-size="pageSize" :page-index="pageIndex" :total-page="totalPage" /> -->
    </div>
  </div>
</template>

<script>
import WorkloadList from '../modules/WorkloadList.vue'
import WorkListTable from '../modules/WorkListTable.vue'
import PageDown from '../modules/PageDown'
import { getUserWorkListAPI } from '@/api/dmd_user'
export default {
  components: {
    WorkloadList, WorkListTable, PageDown
  },
  data() {
    return {
      // pageIndex: 1,
      // pageSize: 10,
      tableList: [],
      totalCount: 0,
      pageSize: 0,
      pageIndex: 0,
      totalPage: 0,
      changeIndex: 1
    }
  },
  created() {
    this.getUserWorkList()
  },
  methods: {
    async getUserWorkList() {
      const { data: { currentPageRecords, pageIndex, pageSize, totalCount, totalPage }} = await getUserWorkListAPI()
      this.totalCount = +totalCount
      this.pageSize = +pageSize
      this.totalPage = +totalPage
      this.pageIndex = +pageIndex
      this.tableList = currentPageRecords
      // console.log(await getUserWorkListAPI())
      console.log(this.pageSize)

      this.$refs.page.one(this.totalCount, this.pageSize, this.totalPage, this.pageIndex)
    },
    renderList(a) {
      console.log(a)
      const { currentPageRecords, totalCount, pageSize, totalPage, pageIndex } = a
      this.tableList = currentPageRecords
      console.log(this.tableList)
      this.totalCount = +totalCount
      this.pageSize = +pageSize
      this.totalPage = +totalPage
      this.pageIndex = +pageIndex
      this.$refs.page.one(this.totalCount, this.pageSize, this.totalPage, this.pageIndex)
    },
    async changePageIndex(a) {
      console.log(a)
      this.changeIndex = a
      const { data: { currentPageRecords }} = await getUserWorkListAPI({
        pageIndex: this.changeIndex
      })
      this.tableList = currentPageRecords
      // console.log(currentPageRecords)
    }
  }
}
</script>

<style lang="scss" scoped>
.two{
  padding: 20px;
}
</style>
