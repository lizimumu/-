<template>
  <el-select v-model="value" placeholder="全部">
    <el-option
      v-for="item in areaList"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
import { areaListAPI } from '@/api/dmd_user'
export default {
  data() {
    return {
      areaList: [],
      value: ''
    }
  },
  created() {
    this.getArea()
  },
  methods: {
    async getArea() {
    //   console.log(areaListAPI())
      const { data: {
        currentPageRecords
      }} = await areaListAPI()
      //   console.log(currentPageRecords)
      this.areaList = currentPageRecords
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input{
    display: flex;
    width: 88px;
    height: 32px;
    justify-content: center;
    align-items: center;
}
::v-deep .el-select__caret {
    line-height: 32px;
}
</style>
