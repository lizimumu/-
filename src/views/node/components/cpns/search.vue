<template>
  <div><div class="search">
    <label class="el-form-item__label">{{ title }}:</label><el-input v-model="input" size="medium" class="input" placeholder="请输入" />
    <div v-if="num==3">   <label class="el-form-item__label label">{{ title }}:</label><el-select v-model="value" filterable placeholder="请选择" class="select">
      <el-option
        v-for="item in options"
        :key="item.id"

        :value="item.name"
      />
    </el-select></div>
    <el-button class="but" type="primary" size="small" @click="search">
      <span class="iconfont icon-sousuo" />
      查询</el-button>
  </div></div>
</template>

<script>
import { getAreaListAPI, PointSearchElementAPI } from '@/api/node'
import { CooperativeQuotientSearchAPI } from '@/api/partner'
export default {
  name: 'Search',
  props: {
    title: {
      type: String,
      required: true

    },
    title1: {
      type: String,
      default: ''

    },
    options: {
      type: Array,
      required: true
    },
    num: {
      type: Number,
      required: true
    }},
  data() {
    return {
      input: '',
      value: '',
      regionld: '',
      pageIndex: 1,
      pageSize: 10

    }
  },
  methods: {
    async  search() {
      if (this.num === 3) {
        this.options.forEach((item) => {
          console.log(item)
          if (item.name === this.value) {
            this.regionld = item.id
          }
        })
        const { data } = await PointSearchElementAPI(this.pageIndex, this.pageSize, this.input, this.regionld)
        this.$emit('search', data)
      }
      if (this.num === 1) {
        const { data } = await getAreaListAPI(this.pageIndex, this.pageSize, this.input)
        console.log(data)
        this.$emit('search', data)
      }
      if (this.num === 2) {
        const { data } = await CooperativeQuotientSearchAPI(this.pageIndex, this.pageSize, this.input)
        this.$emit('search', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

::v-deep .el-input--suffix .el-input__inner {
    padding-right: 30px;
    height: 36px;
}
.label{
  margin-left: 10px;
}
.search{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 64px;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    .input{
      width: 206px;
       height: 36px !important;
    line-height: 36px;

    }

      .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
   font-weight: 400;
   margin-right: 5px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.but{
  margin-left: 10px;
      background-color: #5373e0;
      border-radius: 4px;
      width: 80px;
      font-size: 14px;
      color: #fff;
      span{
        margin-right: 3px;
        margin-left: -2px;
        vertical-align: middle;
      }
}
}

</style>
