<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="search-tab">
          <el-form :inline="true" class="demo-form-inline" :model="formData">
            <el-form-item prop="formData">
              <template #label>
                <span class="search-text"> {{ title1 }}</span>
              </template>
              <el-select v-model="formData.partnerName" clearable placeholder="请选择">
                <el-option
                  v-for="partner in partnerMsgList"
                  :key="partner.account"
                  :label="partner.name"
                  :value="partner.name"
                />
              </el-select>

            </el-form-item>
            <el-form-item prop="value1">
              <template #label />
              <div class="block">
                <span class="demonstration search-text">{{ title2 }}</span>
                <el-date-picker
                  v-model="formData.value1"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  :clearable="false"
                /></div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" class="search-btn" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    title1: {
      type: String,
      default: ''
    },
    title2: {
      type: String,
      default: ''
    },
    partnerMsgList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {
        value1: [dayjs().startOf('month').format('YYYY-MM-DD'), dayjs(new Date()).format('YYYY-MM-DD')],
        partnerName: '',
        partner: {}
      },
      flag: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
      // console.log(this.formData.partnerName)
      // console.log(this.formData.value1)
      this.partnerMsgList.forEach(item => {
        if (item.name === this.formData.partnerName) {
          this.$set(this.formData, 'partner', item)
        }
      })
      this.$emit('searchPartnerReport', this.formData)
    },
    clearOrderNo() {
      // this.formData.orderNo = ''
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
