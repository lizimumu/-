<template>
  <div>
    <el-dialog
      title="数据导入"
      width="438px"
      :visible="btnaddData"
      @close="btnCancel"
    >
      <el-form>
        <el-form-item label="标题:">
          <el-upload
            ref="upload"
            accept=".xlsx,.xls"
            :limit="1"
            :on-exceed="limitCheck"
            :file-list="fileList"
            :on-remove="removeFile"
            :on-change="fileChange"
            :auto-upload="false"
            :before-upload="beforeUpload"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <el-button slot="trigger" size="small" type="primary"><i class="el-icon-upload el-icon--right" />
              上传文件</el-button>
            <div slot="tip" class="upload">支持扩展名： xlsx，xls 文件不得大于1M</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="btnCancel">取消</el-button>
          <el-button type="warning" @click="confirm">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script >
/* eslint-disable */
import { btnaddDataAPI } from '@/api/sku'
export default {
	name:'btnaddData',
	props:{
		btnaddData:{
		 type: Boolean,
      default: false	
		}
	},
	data () {
		return {
			fileList:[]
		}
	},
	methods:{ 
		// 点击取消
	 btnCancel(){
		this.$emit('update:btnaddData', false)
	 },
	 // 点击确定
	 confirm(){
	 },
	 // 选择文件、移除文件、上传文件成功/失败后，都会触发
    fileChange(file, fileList) {
    this.fileList = fileList
	 },
	 // 移除文件时触发
   removeFile(file, fileList) {
    this.fileList = fileList
   },
	 // 选择的文件超出限制的文件总数量时触发
   limitCheck() {
    this.$message.warning('每次只能上传一个文件')
   },
	 // 文件上传前的校验 —— 常见的校验有：校验文件类型，文件大小
   beforeUpload(file) {
  // 根据文件名获取文件的后缀名
  let fileType = file.name.split('.').pop().toLowerCase()
  // 判断文件大小是否符合要求
    if (file.size / 1024 / 1024 > 1) {
        this.$message.error('上传文件大小不能超过 1M !');
          return false
      }
   }
}
}
</script>
 
 
<style  scoped lang="scss">
::v-deep .el-button--warning  {
	margin-left: 60px;
}
::v-deep .el-button--info{
	margin-left: 50px;
	border: 1px solid #fbf4f0;
	background-color: #fbf4f0!important;
	color: #655b56!important;
}
 ::v-deep .el-button--small, .el-button--small.is-round{
	width: 221px;
	height: 36px;
}
.el-button--mini, .el-button--small {
	font-size: 16px;
}
 ::v-deep .el-dialog__header .el-icon-close:before {
  color: #333;
  }
	::v-deep .el-form-item__content{
		line-height: 0;
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
    padding: 30px 80px;
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
	.upload{
		height: 20px;
		color: #BAC0CD;
		font-size: 14px;
		margin-top: 10px;
		margin-left: 20px;
	}
</style>