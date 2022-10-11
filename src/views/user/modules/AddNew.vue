<template>
  <div>
    <el-button @click="addNew"> <i class="el-icon-circle-plus-outline" />新建</el-button>
    <AddUser :is-show.sync="isShow" v-on="$listeners" />
  </div>
</template>

<script>
import AddUser from './AddUser.vue'
export default {
  components: { AddUser },
  data() {
    return {
      isShow: false,
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0
      }
    }
  },
  methods: {
    addNew() {
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button {
    display: flex;
    justify-content: space-around;
   align-items: center;
    width: 80px;
    height: 36px;
    text-align: center;
    color:#fff;
    background-color: #ff8437;
     cursor:pointer;
    ::v-deep .el-icon-circle-plus-outline{
        font-size: 16px;
        // margin-right: 2px;
    }
}
::v-deep .el-button:hover{
  color: #fff;
  background-color: #e54a14;
}
</style>
