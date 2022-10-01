<template>
  <el-row>
    <el-col :span="24">
      <div class="search-tabbar">
        <el-card class="box-card" shadow="never">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <template #label>
                <span class="policy-search-text"> 策略搜索：</span>
              </template>
              <el-input v-model="policyName" placeholder="请输入" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="search-btn" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-card>

      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'SearchTabbar',
  props: {
    // policyName: {
    //   type: [String, Number],
    //   default: ''
    // }
  },
  data() {
    return {
      policyName: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('searchByPolicyName', this.policyName)
    }
  }
}
</script>

 <style scoped lang="scss">
.search-tabbar {
  width: 100%;
  height: 64px;
margin-bottom: 20px;
  .box-card {
    width: 100%;
    height: 64px;
    .demo-form-inline {
      margin-top: -10px;
    }
    .policy-search-text {
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
