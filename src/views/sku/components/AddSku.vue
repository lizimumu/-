<template>
  <el-dialog
    :title="title"
    width="40%"
    :visible="dialogVisible"
    class="h"
    @close="btnCancel"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item
        prop="skuName"
        label="商品名称:"
      >
        <el-input
          v-model="form.skuName"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item
        label="品牌:"
        prop="brandName"
      >
        <el-input
          v-model="form.brandName"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="商品价格(元):" prop="price">
        <el-input-number v-model="form.price" controls-position="right" :step="0.5" :precision="2" :min="0.5" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="商品类型:" prop="classId">
        <el-select v-model="form.classId" placeholder="请选择">
          <el-option
            v-for="item in arr1"
            :key="item.classId"
            v-model="item.classId"
            :label="item.className"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格:" prop="unit">
        <el-input
          v-model="form.unit"
          placeholder="请输入"
          maxlength="10"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="商品图片:" prop="skuImage">
        <el-upload
          class="avatar-uploader"
          action="http://likede2-admin.itheima.net/likede/api/vm-service/sku/fileUpload"
          :show-file-list="false"
          :http-request="beforeAvatarUpload"
        >
          <img v-if="form.skuImage" :src="form.skuImage" class="avatar">
          <i v-else class="el-icon-upload avatar-uploader-icon" />
        </el-upload>
        <p>支持扩展名：jpg、png，文件不得大于100kb</p>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="14">
        <el-button size="samll" class="quxiao" @click="btnCancel">取消</el-button>
      </el-col>
      <el-col :span="10">
        <el-button size="small" class="queren" @click="btnOK">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script >
/* eslint-disable */
// changeSkuAPI 修改商品
//  AddSkuAPI 新增商品
import {changeSkuAPI, AddSkuAPI, skuClassSearchAPI} from "@/api/sku"
  export default {
    props:{
       dialogVisible:{
        type: Boolean,
        default: false
     }
    },
  data () {
    return {
      num: undefined,
      imageUrl: '',
			arr1:[],
      rules: {
        skuName: [{ required: true, message: '请输入', trigger: 'blur' }],
        brandName: [{ required: true, message: '请输入', trigger: 'blur' }],
        price: [{ required: true, message: '请输入', trigger: 'change' }],
        classId: [{ required: true, message: '请输入', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入', trigger: 'blur' }],
        skuImage: [{ required: true, message: '请上传', trigger: 'change' }]
      },
      form: {
        skuName: '',
        skuImage: '',
        price: undefined,
        classId: '',
        unit: '',
        brandName: ''
      }
    }
  },
	computed: {
     title() {
      return this.form.skuId ? '修改商品' : '新增商品'
    }
  },
	created() { 
		this.skuClassSearchAPI()
	},
  methods: {
		async skuClassSearchAPI(){
			const {data}=await skuClassSearchAPI()
			this.arr1=data.currentPageRecords
			// console.log(this.arr1)
		},
		// 点击确定
    async btnOK() {
			 try {
        await this.$refs.form.validate()
				const res=await changeSkuAPI(this.form)
				// console.log(res)
        if (this.form.skuId) {
          await changeSkuAPI(this.form)
          this.$message.success('修改成功')
          this.$emit('skuSearch')
        } else {
					await AddSkuAPI(this.form)
					console.log(this.form)
          this.$message.success('新增成功')
          this.$emit('skuSearch')
				}
			}catch(e){
				console.log(e)
			}
			this.btnCancel()
    },
		// 点击取消
    btnCancel(){
			this.$emit('update:dialogVisible', false)
			this.form = {
				skuName: '',
        skuImage: '',
        price: undefined,
        classId: '',
        unit: '',
        brandName: ''
      }
    },
    async beforeAvatarUpload(file) {
			console.log(file)
      const isJPG = file.file.type === 'image/jpeg'
			const isPNG = file.file.type === 'image/png'
      const isLt2M = file.file.size / 1024 < 100;
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 jpg、png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100kb!');
      }
			const fd = new FormData()
      fd.append('fileName', file.file)
      const { data } = await UploadPic(fd)
			console.log(data)
      this.form.skuImage = data
      return (isJPG || isPNG) && isLt2M
      }
    }
   }
  </script>
   
  <style scoped lang="scss">
	// 图片
	::v-deep .avatar[data-v-2f99c659]{
		width: 76px;
		height: 76px;
		margin: 4px;
	}
	::v-deep .el-form-item__label {
		padding: 0;
	}
  ::v-deep .el-dialog__header .el-icon-close:before {
  color: #333;
  }
	::v-deep .el-input__inner{
		margin-left: 10px;
	}
  ::v-deep .el-dialog__title {
    line-height: 24px;
    font-size: 16px;
    color: #303133;
		font-weight: 700;
  }
	::v-deep .el-form-item__label{
		font-weight: 400;
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
  .el-dialog__header{
      background-color: #fff;
  }
  .el-dialog__header .el-dialog__title{
      color: #000;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #fff;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 78px;
    text-align: center;
    border-radius: 6px;
    background-color: #F3F6FB;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .quxiao{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    background-color: #fbf4f0!important;
    border: none;
    color: #655b56!important;
    font-size: 14px;
    margin-left: 200px;
}
.queren{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px!important;
    height: 36px;
    padding: 0;
    background: linear-gradient(135deg,#ff9743,#ff5e20)!important;
    border: none;
    font-size: 14px;
    color: #fff;
}
.el-input-number,.el-select{
  width: 434.4px;
}
  </style>