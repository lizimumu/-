<template>
  <div><el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="630px"
    :before-close="handleClose"
  >
    <el-form ref="data" :model="data" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="点位名称：" prop="name">
        <el-input
          v-model.trim="data.name"
          type="text"
          placeholder="请输入"
          maxlength="15"
          show-word-limit
        />

      </el-form-item>
      <el-form-item label="所在区域：" prop="region">
        <el-select v-model="data.region" filterable placeholder="请选择" class="select">
          <el-option
            v-for="item in options1"
            :key="item.id"

            :value="item.name"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="所属商圈：" prop="Business">
        <el-select v-model="data.Business" filterable placeholder="请选择" class="select">
          <el-option
            v-for="item in options2"
            :key="item.id"

            :value="item.name"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="归属合作商:" prop="Partners">
        <el-select v-model="data.Partners" filterable placeholder="请选择" class="select">
          <el-option
            v-for="item in options3"
            :key="item.id"

            :value="item.name"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="详细地址" prop="value">
        <el-cascader
          ref="ipt"
          v-model="data.value"
          :options="options"
          :props="{ emitPath: false}"
          @change="handleChange"
        />

      </el-form-item>
      <el-form-item prop="textarea">
        <el-input
          v-model="data.textarea"
          type="textarea"
          placeholder="请输入内容"
          maxlength="60"
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
import { getAreaListAPI, BusinessDistrictListAPI, AddPointAPI, ModifyPointLocationAPI } from '@/api/node'
import { regionData } from 'element-china-area-data'
import { CooperativeQuotientSearchAPI } from '@/api/partner'
export default {
  name: 'Haha',
  props: {
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: '',
      options1: [],
      options2: [],
      options3: [],
      data: {
        name: '',
        region: '',
        Business: '',
        Partners: '',
        value: '',
        textarea: ''
      },
      form: {
        name: '',
        addr: '',
        areaCode: '',
        createUserId: this.$store.state.user.data.userId,
        regionId: '',
        businessId: '',
        ownerId: '',
        ownerName: ''

      },

      rules: {
        name: [{ required: true, message: '请输入', trigger: 'blur' }],
        region: [{ required: true, message: '请输入', trigger: 'blur' }],
        Business: [{ required: true, message: '请输入', trigger: 'blur' }],
        Partners: [{ required: true, message: '请输入', trigger: 'blur' }],
        account: [{ required: true, message: '请输入', trigger: 'blur' }],
        value: [{ required: true, message: '请输入', trigger: 'blur' }] },
      options: regionData

    }
  },
  computed: {
    title() {
      return this.id ? '修改点位' : '新增点位'
    }
  },
  methods: {

    handleClose() {
      this.$refs.data.resetFields()
      this.$emit('close', this)
      this.data = {

      }
      this.id = ''
    },
    created() {
      this.getData()
    },
    handleChange() {
      this.form.addr = this.$refs.ipt.getCheckedNodes()[0].pathLabels.join('-')
    },
    ModifyData(row) {
      this.id = row.id
      this.$set(this.data, 'textarea', row.adder)
      this.data.name = row.name
      this.data.region = row.region.name
      this.data.Business = row.businessType.name
      this.data.Partners = row.ownerName

      this.$nextTick(() => {
        this.$refs.ipt.inputValue = row.value
      })

      // this.$refs.ipt. = row.value
    },
    async getData() {
      const { data } = await BusinessDistrictListAPI()
      this.options2 = data

      const res = await getAreaListAPI(1, 1000000000000)
      this.options1 = res.data.currentPageRecords

      const res1 = await CooperativeQuotientSearchAPI(1, 1000000000000)
      this.options3 = res1.data.currentPageRecords
    },

    Takeaway() {
      this.handleClose()
    },
    sure() {
      this.$refs.data.validate().then(async() => {
        this.form.name = this.data.name
        this.form.addr += '-' + this.data.textarea
        this.form.areaCode = this.data.value

        this.options1.forEach((item) => {
          if (item.name === this.data.region) {
            this.form.regionId = item.id
          }
        })
        this.options2.forEach((item) => {
          if (item.name === this.data.Business) {
            this.form.businessId = item.id
          }
        })
        this.options3.forEach((item) => {
          if (item.name === this.data.Partners) {
            this.form.ownerId = item.id
            this.form.ownerName = this.data.Partners
          }
        })

        this.id ? ModifyPointLocationAPI(this.id, this.form) : await AddPointAPI(this.form)

        this.handleClose()
      }).catch(() => {
        console.log('校验失败')
      })
    }
  }
}
</script>
<style lang='scss'>
.el-cascader-node.in-active-path {
    color: red;
    font-weight: 700;
}
</style>
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
    padding-left: 50px;
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
    width: 405px;
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
