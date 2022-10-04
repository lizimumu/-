<template>
  <el-table
    :data="partnerList"
    style="width: 100%"
    class="order-form-table"
    :border="false"
    :header-cell-style="{background:'#f3f6fb'}"
  >
    <el-table-column
      prop="date"
      label="订单日期"
      width="180"
    />
    <el-table-column
      prop="ownerName"
      label="合作商"
      width="180"
    />
    <el-table-column
      prop="ratio"
      label="分成比例"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.ratio }}%</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="orderTotalMoney"
      label="收入（元）"
    >
      <template slot-scope="scope">
        <span>+{{ scope.row.orderTotalMoney|filterOrderTotalMoney }}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="orderCount"
      label="笔数"
    />
    <el-table-column
      prop="totalBill"
      label="分成金额（元）"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.totalBill|filterOrderTotalMoney }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  filters: {
    filterOrderTotalMoney(val) {
      return (val / 100).toFixed(2)
    }
  },
  props: {
    partnerList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableData: []
    }
  }
}
</script>

<style lang="scss">
.order-form-table {
 .el-table__body td{
    border: 0;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 44px;
}
tr th.is-leaf {
  border: none;
}
.el-table{
  &::before {
height: 0;
  }
}
}

</style>
