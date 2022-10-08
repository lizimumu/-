<template>
  <div><el-dialog
    title="新增工单"
    :visible.sync="dialogVisible"
    width="630px"
    :before-close="handleClose"
  >
    <el-form ref="data" :model="data" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="设备编号：" prop="name">
        <el-input
          v-model.trim="data.name"
          type="text"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />

      </el-form-item>
      <el-form-item label="工单类型：" prop="region">
        <el-select v-model="data.region" filterable placeholder="请选择" class="select">
          <el-option
            v-for="item in options1"
            :key="item.id"

            :value="item.name"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="运维人员：" prop="Business">
        <el-select v-model="data.Business" filterable placeholder="请选择" class="select">
          <el-option
            v-for="item in options2"
            :key="item.id"

            :value="item.name"
          />
        </el-select>

      </el-form-item>
      <el-form-item prop="textarea">
        <el-input
          v-model="data.textarea"
          type="textarea"
          placeholder="请输入备注,(不超过40个字)"
          maxlength="40"
          show-word-limit
        />

      </el-form-item></el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="left-btn" @click="Takeaway">取 消</el-button>
      <el-button type="primary" class="right-btn" @click="sure">确 定</el-button>
    </span>
  </el-dialog></div>
</template>

<script>

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      options1: [],
      options2: [],
      data: {

      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        region: [{ required: true, message: '请输入', trigger: 'blur' }],
        Business: [{ required: true, message: '请输入', trigger: 'blur' }],
        Partners: [{ required: true, message: '请输入', trigger: 'blur' }],
        account: [{ required: true, message: '请输入', trigger: 'blur' }],
        value: [{ required: true, message: '请输入', trigger: 'blur' }] }

    }
  },

  methods: {

    handleClose() {
      this.$refs.data.resetFields()
    },
    created() {
      this.getData()
    },

    Takeaway() {
      this.handleClose()
    },
    sure() {

    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep .el-dialog__header {
    background: #fff;
    color: #333;
     border-radius: 10px;
     font-weight: 600;
     font-size:14px,
}

::v-deep .el-dialog__header .el-icon-close:before {
    color: #333;
}
::v-deep .el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #303133;
}
::v-deep .el-dialog__body {
    padding: 20px 75px;
    padding-left: 70px !important;
    padding-right: 75px !important;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
::v-deep .el-dialog{
  border-radius: 10px;
}
.el-dialog .el-dialog__body .el-form-item {
    margin-bottom: 20px;
}
.dialog-footer{
  margin-top: -20px;
display: flex;
justify-content: center;
}
::v-deep .el-input--suffix .el-input__inner {
    padding-right: 30px;
    width: 385px;
}
::v-deep .el-textarea__inner {
height: 82px;
}
::v-deep  .el-form-item__label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    font-weight: normal;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.left-btn{
    width: 80px!important;
    height: 36px;
    padding: 0;
    border: 0px;
        color: #655b56!important;
    background-color: #fbf4f0!important;
}
// ::v-deep .el-input__inner {

//     width: 396px;
// }
.right-btn{
  margin-left: 34px;
   width: 80px!important;
height: 36px;
    padding: 0;
    color: #fff;
    border: 0px;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
}
</style>
