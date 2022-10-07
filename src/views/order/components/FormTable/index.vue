<template>
  <div v-loading="loading">
    <!-- 搜索框区域 -->
    <search-tab @searchOrderDetail="searchOrderDetail" />
    <!-- 表格区域 -->
    <el-card class="order_form">
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#f3f6fb'}"
        :row-style="{height:'44px'}"
        tooltip-effect="dark"
      >
        <el-table-column
          label="序号"
          width="50"
          type="index"
        />
        <el-table-column
          prop="orderNo"
          label="订单编号"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="skuName"
          label="商品名称"
        />
        <el-table-column
          prop="price"
          label="订单金额(元)"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.price | filterPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="innerCode"
          label="设备编号"
          width="160"
        />
        <el-table-column
          prop="status"
          label="订单状态"
          width="160"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.status | filterPayStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="订单日期"
          width="220"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | filterCreateTime }}</span>
          </template>

        </el-table-column>
        <el-table-column
          label="操作"
          width="100"
        >
          <template slot-scope="{row}">
            <el-button ref="getdetail" size="small" type="text" @click="lookDetailOrder(row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <control-page
        v-if="flag"
        :page-index="order.pageIndex"
        :page-size="order.pageSize"
        :total-count="totalCount"
        :total-page="totalPage"
        :flag="flag"
        @toPrevPolicy="toPrevPolicy"
      />
    </el-card>

    <!-- 详情区域 -->
    <order-detail v-if="dialogVisible" :dialog-visible.sync="dialogVisible" :detail-msg="detailMsg" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SearchTab from '../SearchTab'
import { searchOrderAPI } from '@/api/order'
import ControlPage from '../ControlPage'
import OrderDetail from '../OrderDetail'
export default {
  components: {
    SearchTab,
    ControlPage,
    OrderDetail
  },
  filters: {
    filterPrice(val) {
      return (val / 100).toFixed(2)
    },
    filterPayStatus(val) {
      if (val === 0) {
        return '未支付'
      } else if (val === 1) {
        return '支付完成'
      } else if (val === 2) {
        return '出货成功'
      } else {
        return '出货失败'
      }
    },
    filterCreateTime(val) {
      return val.replace('T', ' ').replace(/-/ig, '.')
    }
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      order: {
        pageIndex: 1,
        pageSize: 10,
        orderNo: null,
        startDate: '',
        endDate: ''
      },
      totalCount: 0,
      totalPage: 1,
      flag: false,
      detailMsg: {},
      loading: false
    }
  },
  watch: {
    totalCount(val) {
      this.flag = false
      if (val !== 0) {
        this.$nextTick(() => {
          this.flag = true
        })
      }
    }
  },
  created() {
    this.searchOrder()
  },
  methods: {
    async  searchOrder() {
      this.loading = true
      try {
        const { data } = await searchOrderAPI(this.order)
        // console.log(data)
        this.tableData = data.currentPageRecords
        this.order.pageIndex = data.pageIndex
        this.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
      } catch (e) {
        throw new Error()
      } finally {
        this.loading = false
      }
    },
    toPrevPolicy(pageIndex) {
      this.order.pageIndex = pageIndex
      this.searchOrder()
    },
    searchOrderDetail(val) {
      // console.log(val)
      this.$set(this.order, 'orderNo', val.orderNo)
      if (val.value !== '') {
        this.$set(this.order, 'startDate', dayjs(val.value[0]).format('YYYY-MM-DD'))
        this.$set(this.order, 'endDate', dayjs(val.value[1]).format('YYYY-MM-DD'))
      }
      // console.log(this.order)
      this.searchOrder()
    },
    lookDetailOrder(val) {
      this.detailMsg = val
      this.dialogVisible = true
    }

  }
}
</script>
<style lang="scss">
.order_form {
 .el-table__body td{
    border: 0;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 44px;
}
}
</style>
