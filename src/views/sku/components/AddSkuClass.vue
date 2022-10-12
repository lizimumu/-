<template>
  <el-dialog
    :title="title"
    :visible="showDialog"
    width="630px"
    @close="btnCancel"
  >
    <el-form
      ref="shopForm"
      :model="shopForm"
      label-width="120px"
    >
      <el-form-item
        prop="className"
        label="商品类型名称:"
        :rules="[{ required: true, message: '商品类型名称不能为空', trigger: 'blur' }]"
      >
        <el-input
          v-model="shopForm.className"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="14">
        <el-button size="medium" class="quxiao" @click="btnCancel">取消</el-button>
      </el-col>
      <el-col :span="10">
        <el-button size="medium" type="warning" class="queren" @click="btnOK">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// 修改商品类型 changeskuClassAPI
// 新增商品类型 addskuClassAPI
import { changeskuClassAPI, addskuClassAPI } from '@/api/sku'
export default {
  name: 'AddSkuClass',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      shopForm: {
        className: '',
        classId: ''
      }
    }
  },
  computed: {
    title() {
      return this.shopForm.classId ? '修改商品类型' : '新增商品类型'
    }
  },
  methods: {
    async btnOK() {
      try {
        await this.$refs.shopForm.validate()
        console.log(this.$emit('skuClassSearch'))
        if (this.shopForm.classId) {
          await changeskuClassAPI(this.shopForm.className, this.shopForm.classId)
          this.$message.success('编辑成功')
          this.$emit('skuClassSearch')
        } else {
          await addskuClassAPI(this.shopForm.className)
          this.$message.success('新增成功')
          this.$emit('skuClassSearch')
        }
      } catch (error) {
        console.log(error)
      }
      this.btnCancel()
    },
    // 点击取消
    btnCancel() {
      this.$emit('update:showDialog', false)
      this.shopForm = {
        className: '',
        classId: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__header .el-icon-close:before {
color: #333;
}
::v-deep .el-dialog__title {
line-height: 24px;
font-size: 16px;
color: #303133;
}
::v-deep .el-dialog__body {
padding: 30px 40px;
color: #606266;
font-size: 14px;
word-break: break-all;
}
::v-deep .el-dialog{
border-radius: 10px;
}
::v-deep .el-dialog__header{
 background-color: #fff;
 border-radius: 10px
}
.quxiao{
	background-color: #fbf4f0!important;
	border:1px solid #fbf4f0;
	left: 50px;
	margin-left: 170px;
}
</style>
