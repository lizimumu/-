<template>
  <div class="order-detail-dialog">
    <el-dialog
      title="订单详情"
      :visible="dialogVisible"
      width="630px"
      :before-close="handleClose"
    >
      <span>
        <el-row class="detail-dialog-title">
          <el-col :span="16">
            <div class="detail-left">
              <i class="el-icon-success successMsg" />
              <span class="detail-status">{{ detailMsg.status|filterPayStatus }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-status-img">
              <img src="@/assets/common/successYaMi.png" alt="">

            </div></el-col>
        </el-row>
        <el-row class="detail-dialog-text" :gutter="20">
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <div class="order-detail-item">
                <span>订单编号：</span>
                <span>{{ detailMsg.orderNo }}</span>
              </div>
              <div class="order-detail-item">
                <span>设备编号：</span>
                <span>{{ detailMsg.innerCode }}</span>
              </div>
              <div class="order-detail-item">
                <span>完成时间：</span>
                <span>{{ detailMsg.updateTime|filterCreateTime }}</span>
              </div>
              <div class="order-detail-item">
                <span>设备地址：</span>
                <span>{{ detailMsg.addr|filterAddr }}</span>
              </div>
            </div>
          </el-col>
          <el-col :span="12"><div class="grid-content bg-purple-dark">
            <div class="order-detail-item">
              <span>商品名称：</span>
              <span>{{ detailMsg.skuName }}</span>
            </div>
            <div class="order-detail-item">
              <span>订单金额：</span>
              <span>{{ detailMsg.price|filterPrice }}</span>
            </div>
            <div class="order-detail-item">
              <span>创建时间：</span>
              <span>{{ detailMsg.createTime|filterCreateTime }}</span>
            </div>
            <div class="order-detail-item">
              <span>支付方式：</span>
              <span>{{ detailMsg.payType |filterPayType }}</span>
            </div>

          </div></el-col>
        </el-row>
      </span>

    </el-dialog>
  </div>
</template>

<script>
export default {
  filters: {
    filterPrice(val) {
      return (val / 100).toFixed(2)
    },
    filterPayStatus(val) {
      if (val === 0) {
        return '订单已创建'
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
    },
    filterAddr(val) {
      return val.substring(val.lastIndexOf('-') + 1)
    },
    filterPayType(val) {
      if (val === 1) {
        return '支付宝支付'
      } else {
        return '微信支付'
      }
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    detailMsg: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
    }
  }
}
</script>

<style lang="scss">
.order-detail-dialog {
  .el-dialog__header {
    background: #fff;
     .el-dialog__title{
      color: #333;
      font-weight: 700;
      font-size: 16px;
      }
      .el-icon-close{
        &::before{
          content: "\e6db";
          color: #9ea1a6;
        }
      }

}
.detail-dialog-title {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  height: 54px;
  background-color: #f8f8f8;
  .detail-left {
    height: 100%;
    display: flex;
    align-items: center;
  .successMsg {
    margin-left: 10px;
    margin-right: 20px;
    width: 26px;
    height: 26px;
    font-size: 26px;
    color: #79e192;
  }
  }
  .detail-status-img {
    background-color: transparent;
  }

}
.detail-dialog-text {
  padding: 0 20px;
  .order-detail-item {
    margin-bottom: 30px;
    font-size: 14px;
    color: #606266;
  }
}

}

</style>
