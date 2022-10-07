<template>
  <div><el-dialog
    title="修改合作商"
    :visible.sync="dialogVisible"
    width="630px"
    :before-close="handleClose"
  >
    <el-form ref="data" :model="data" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="合作商名称" prop="name">
        <el-input
          v-model.trim="data.name"
          type="text"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          class="ipt"
        />

      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input
          v-model.trim="data.contact"
          type="text"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
          class="ipt"
        />

      </el-form-item>
      <el-form-item label="联系电话" prop="mobile">
        <el-input
          v-model.trim="data.mobile"
          type="text"
          placeholder="请输入"
          maxlength="11"
          show-word-limit
          class="ipt"
        />

      </el-form-item>
      <el-form-item label="分成比例(%)" prop="ratio">
        <el-input-number v-model.trim="data.ratio" controls-position="right" class="number" :max="100" />

      </el-form-item>
      <el-form-item v-if="!data.id" label="账号" prop="account">
        <el-input
          v-model.trim="data.account"
          type="text"
          placeholder="请输入"
          maxlength="18"
          show-word-limit
          class="ipt"
        />

      </el-form-item>
      <el-form-item v-if="!data.id" label="密码" prop="password">
        <el-input
          v-model.trim="data.password"
          type="text"
          placeholder="请输入"
          maxlength="20"
          show-word-limit
          class="ipt"
        />

      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button class="left-btn" @click="Takeaway">取 消</el-button>
      <el-button type="primary" class="right-btn" @click="sure">确 定</el-button>
    </span>
  </el-dialog></div>
</template>

<script>
import { ModifyPartnerAPI, NewPartnersAPI } from '@/api/partner'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {

      data: {
        name: '',
        ratio: '',
        contact: '',
        mobile: '',
        account: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入', trigger: 'change' }],
        ratio: [{ required: true, message: '请输入', trigger: 'change' }],
        contact: [{ required: true, message: '请输入', trigger: 'change' }],
        mobile: [{ required: true, message: '请输入', trigger: 'change' }, { pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/, message: '请输入正确的手机号', trigger: 'change' }],
        account: [{ required: true, message: '请输入', trigger: 'change' }],
        password: [{ required: true, message: '请输入', trigger: 'change' }]
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
      this.$refs.data.resetFields()
      setImmediate(() => {
        this.data = {
          name: '',
          ratio: '',
          contact: '',
          mobile: '',
          account: '',
          password: ''
        }
      }, 1000)
    },
    Takeaway() {
      this.handleClose()
    },
    sure() {
      this.$refs.data.validate().then(async() => {
        this.data.id ? await ModifyPartnerAPI(this.data.id, this.data) : NewPartnersAPI(this.data)
        this.handleClose()
      }).catch(() => {
        console.log('校验失败')
      })
    }
  }

}
</script>

<style scoped lang='scss'>
::v-deep .el-input__inner {
  width: 396px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #d8dde3;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
}
.number{
  width: 410px;
}
::v-deep .el-dialog .el-dialog__body {
    padding: 20px 80px 10px  40px!important;
    color: #666;
    padding: 30px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
}
.dialog-footer{
  margin-top: -20px;
display: flex;
justify-content: center;
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
</style>
