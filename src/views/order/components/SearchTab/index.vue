<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="search-tab">
          <el-card class="box-card" shadow="never">
            <el-form :inline="true" class="demo-form-inline" :model="formData">
              <el-form-item prop="orderNo">
                <template #label>
                  <span class="search-text"> 订单编号：</span>
                </template>
                <el-input v-model="formData.orderNo" placeholder="请输入">
                  <i
                    v-if="formData.orderNo.length!==0"
                    slot="suffix"
                    class="el-icon-circle-close"
                    @click="clearOrderNo"
                  />
                </el-input>
              </el-form-item>
              <el-form-item prop="value">
                <template #label />
                <div class="block">
                  <span class="demonstration search-text">选择日期：</span>
                  <el-date-picker
                    v-model="formData.value"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" class="search-btn" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </el-card>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      formData: {
        value: '',
        orderNo: ''
      }
    }
  },
  methods: {
    onSubmit() {
      // console.log(this.formData.orderNo)
      // console.log(this.formData.value)
      this.$emit('searchOrderDetail', this.formData)
    },
    clearOrderNo() {
      this.formData.orderNo = ''
    }
  }
}
</script>

 <style scoped lang="scss">
.search-tab {
  width: 100%;
  height: 64px;
margin-bottom: 20px;
.el-input {
  width: 210px;
}
.el-form-item__label {
  font-weight: normal;
}
  .box-card {
    width: 100%;
    height: 64px;
    .demo-form-inline {
      margin-top: -10px;
    }
    .search-text {
      font-size: 14px;
      color:#606266;
      font-weight: 400;
    }
    .search-btn {
      background-color: #5f84ff !important;
    }
  }
}
 </style>
