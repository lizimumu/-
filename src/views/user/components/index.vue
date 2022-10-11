<template>
  <div>
    <div class="container">
      <SearchModules @search-list="searchList" />
      <el-card class="box-card">
        <div class="result">
          <div class="addNew">
            <AddNew @father="father" />
          </div>
          <div class="table">
            <!-- <TableData :new-region-name="newRegionName" :new-list="newList" /> -->
            <TableData :index="changeIndex" :new-list="newList" :search-list="search" />
          </div>
          <div class="page">
            <!-- <PageDown :total-count="totalCount" :page-size="pageSize" :page-index.sync="pageIndex" :total-page="totalPage" /> -->
            <PageDown ref="page" @nextPageIndex="changePageIndex" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserListAPI } from '@/api/dmd_user'

import SearchModules from '../modules/SearchModules.vue'
import AddNew from '../modules/AddNew.vue'
import TableData from '../modules/TableData.vue'
import PageDown from '../modules/PageDown.vue'
export default {
  components: {
    SearchModules, AddNew, TableData, PageDown
  },
  data() {
    return {
      search: [],
      newList: [],
      userName: [],
      totalCount: 0,
      pageSize: 0,
      pageIndex: 0,
      totalPage: 0,
      changeIndex: 1
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: { currentPageRecords }} = await getUserListAPI()
      this.newList = JSON.parse(JSON.stringify(currentPageRecords))
      const { data: { pageIndex, pageSize, totalCount, totalPage }} = await getUserListAPI()
      this.totalCount = +totalCount
      this.pageSize = +pageSize
      this.totalPage = +totalPage
      this.pageIndex = +pageIndex
      // for (const k in this.newList) {
      //   this.newRegionName.push(this.newList[k].userName)
      // }
      this.$store.commit('user/SET_DMDUSERINFO', this.newList)
      this.$refs.page.one(this.totalCount, this.pageSize, this.totalPage, this.pageIndex)
    },
    searchList(a) {
      this.newList = a
    },
    father() {
      console.log('father')
      this.getUserList()
    },
    async changePageIndex(a) {
      this.changeIndex = a
      const { data: { currentPageRecords }} = await getUserListAPI({
        pageIndex: this.changeIndex
      })
      this.newList = currentPageRecords
      // console.log(currentPageRecords)
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  width: 1713px;
  height: 757px;
  padding: 0 20px 20px;
  .search{
    width: 1713px;
    height: 64px;
  }
  .result{
    width: 100%;
    height: 673px;
    .addNew{
      width: 1630px;
      height: 36px;
      margin-bottom: 20px;
    }
  }
}
</style>
