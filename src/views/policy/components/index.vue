<template>
  <div class="policy-container">
    <search-tabbar :policy-name="policyPage.policyName" @searchByPolicyName="searchByPolicyName" />
    <div class="policy-table">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-button type="primary" icon="el-icon-circle-plus-outline" class="addPolicy-btn">新建</el-button>
        </div>
        <div class="text item">
          <el-table
            :data="tableData"
            style="width: 100%"
            :header-cell-style="{background:'#f3f6fb'}"
          >
            <el-table-column
              label="序号"
              width="100"
              type="index"
            />
            <el-table-column
              prop="policyName"
              label="策略名称"
            />
            <el-table-column
              prop="discount"
              label="策略方案"
            />
            <el-table-column
              prop="createTime"
              label="创建日期"
              width="240"
            />
            <el-table-column
              label="操作"
              width="240"
            >
              <el-button size="small" type="text" @click="getDetail">查看详情</el-button>
              <el-button size="small" type="text">修改</el-button>
              <el-button size="small" type="text">删除</el-button>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
      <get-detail :dialog-visible="dialogVisible" />
    </div>
  </div>
</template>

<script>
import SearchTabbar from '@/components/SearchTab/SearchTabbar.vue'
import { getPolicyListAPI } from '@/api/policy'
import GetDetail from './getDetail.vue'
export default {
  components: {
    SearchTabbar,
    GetDetail
  },
  data() {
    return {
      policyPage: {
        pageIndex: 1,
        pageSize: 10,
        policyName: ''
      },
      tableData: [],
      total: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getPolicyList()
  },
  methods: {
    async getPolicyList() {
      const { data } = await getPolicyListAPI(this.policyPage)
      // console.log(data)
      this.tableData = data.currentPageRecords
      this.total = data.totalCount
    },
    searchByPolicyName(val) {
      this.policyPage.policyName = val
      // console.log(this.policyPage.policyName)
      this.getPolicyList()
    },
    getDetail() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
.policy-container {
  padding-left: 20px;
  .policy-table {
    width: 100%;
      .box-card {
  width: 100%;
  .addPolicy-btn {
  background-color: #ff8a3b;
  border: 0;
}
}
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }

}

</style>
