<template>
  <div><el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="630px"
    :before-close="handleClose"
    hight="315px"
  >

    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="regionName">
        <el-input
          v-model="ruleForm.regionName"
          type="text"
          placeholder="请输入内容"
          maxlength="10"
          show-word-limit
          class="ipt"
        />

      </el-form-item>
      <el-form-item label="活动区域" prop="remark">
        <el-input
          v-model="ruleForm.remark"
          type="textarea"
          placeholder="请输入内容"
          maxlength="40"
          show-word-limit
        /></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="left-btn" @click="Takeaway">取 消</el-button>
      <el-button v-loading="loading" class="right-btn" @click="sure">确 定</el-button>
    </span>
  </el-dialog></div>
</template>

<script>
import { AddAreaAPI, ModifyArea } from '@/api/node'
export default {
  name: 'Kkk',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      title: '新增区域',
      ruleForm: {
        regionName: '',
        remark: ''
      },
      rules: {
        regionName: [{ required: true, message: '请输入' }],
        remark: [{ required: true, message: '请输入' }]
      }
    }
  },
  // computed: {
  //   title() {
  //     console.log(this.ruleForm.id)
  //     return this.ruleForm.id ? '编辑区域' : '新增区域'
  //   }
  // },
  watch: {
    ruleForm: {
      deep: true,
      handler() {
        if (this.ruleForm.id) {
          this.title = '编辑区域'
        } else {
          this.title = '新增区域'
        }
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('closes')
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        regionName: '',
        remark: ''
      }
    },

    Takeaway() {
      this.handleClose()
    },
    sure() {
      this.$refs.ruleForm.validate().then(() => {
        this.$loading = true
        this.ruleForm.id ? ModifyArea(this.ruleForm.id, this.ruleForm) : AddAreaAPI(this.ruleForm)
        this.handleClose()
        this.$emit('closes')
        this.loading = false
      }).catch(() => {
        console.log('校验失败')
      })
    }
  }
}
</script>

<style scoped lang='scss'>
::v-deep  .el-dialog__header {
    background: #fff;
    color: #333;
     border-radius: 10px;
     font-weight: 500;
     font-size: 16px;
}
.left-btn{
    width: 80px!important;
    height: 36px;
    padding: 0;
    border: 0px;
        color: #655b56!important;
    background-color: #fbf4f0!important;
}
.right-btn{
  margin-left: 34px;
   width: 80px!important;
height: 36px;
    padding: 0;
    color: #fff;
    border: 0px;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
}
.ipt{
  width: 396px;
  height: 36px;
  margin-left: 25px;
}
 ::v-deep .el-textarea__inner {
 display: block;
    resize: vertical;
    padding: 5px 15px;
margin-left: 25px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 396px;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    height: 82px;
    border: 1px solid #d8dde3;
    border-radius: 4px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1)

}
::v-deep .el-form-item__label {
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
::v-deep .el-textarea .el-input__count {
    color: #909399;
    background: #FFF;
    position: absolute;
    font-size: 12px;
    bottom: 5px;
    right: 90px;
}
::v-deep .el-dialog__header .el-icon-close:before {
    color: #333;
}
::v-deep  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
}
::v-deep .el-dialog__body {
    padding: 20px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
.dialog-footer{
  margin-top: -20px;
display: flex;
justify-content: center;
}
</style>
