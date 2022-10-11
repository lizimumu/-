<template>
  <div>
    <el-dialog v-if="isShow" :visible="isShow" :show-close="false">
      <template #title>
        <div style="display:flex;justify-content: space-between;">
          <span class="title">编辑人员</span>
          <span class="close" style="color:#c1c1c1;" @click="close">X</span>
        </div>
      </template>
      <el-form
        ref="userInfo"
        :model="userInfo"
        :rules="rules"
        label-position="right"
        label-width="120px"
        class="form"
      >
        <el-form-item label="人员名称：" prop="name">
          <el-input
            v-model="userInfo.userName"
            type="text"
            placeholder="请输入"
            maxlength="5"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="角色：" prop="sex">
          <template>
            <el-select
              v-model="userInfo.role.roleName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.label"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="联系电话：" prop="tel">
          <el-input
            v-model="userInfo.mobile"
            type="text"
            placeholder="请输入"
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="负责区域：">
          <template>
            <el-select
              v-model="userInfo.regionName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in area"
                :key="item.id"
                :label="item.label"
                :value="item.label"
              /></el-select>
          </template>
        </el-form-item>
        <el-form-item label="头像：" prop="img">
          <div class="el-upload-img">
            <!--
                    此处使用了ElementUI中的 Upload组件
                    action:异步上传的目的地,注意这里就是完整地址
                    list-type="picture-card" 上传的UI界面
                    text/picture/picture-card
                    :limit="数字":表示最多上传几个文件
                    :on-exceed="handleExceed":表示上传超过了个数执行的函数
                    :before-upload="beforeAvatarUpload":上传之前最后一个执行的函数
                    :on-success="handleAvatarSuccess":表示上传成功之后执行的函数
                    :on-remove="handleRemove" 点击垃圾桶删除上传文件执行的钩子函数
                    :on-preview="handlePictureCardPreview" 点击放大镜查看上传文件时执行的
                    钩子
                    :show-file-list="true" 是否显示已经上传的文件列表
                    :file-list="fileList" 表示已经上传的文件列表
                -->
            <!-- <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="userInfo.image" :src="userInfo.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
            </el-upload> -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="userInfo.image" :src="userInfo.image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-checkbox v-model="userInfo.status">是否启用</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="cancel">取 消</el-button>
        <el-button
          class="sure"
          type="primary"
          @click="confirmAddUser(userInfo)"
        >确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { areaListAPI, editUserAPI, uploadImageAPI } from '@/api/dmd_user'
export default {
  props: {
    isShow: {
      type: Boolean,
      required: true
    },
    userInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      areaList: [],
      isLoading: false,
      // checked: this.userInfo.status,
      // imageUrl: '',
      // userForm: this.userInfo,
      rules: { // 表单验证
        name: [{ required: true, message: '请输入人员名称', trigger: 'blur' }],
        tel: [{ required: true, message: '请输入人员电话', trigger: 'blur' }],
        img: [{ required: true, message: '支持扩展名：jpg、png，文件不得大于100kb', trigger: 'blur' }]
      },
      options: [ // 下拉框选项
        {
          id: '1',
          label: '运营员'
        },
        {
          id: '2',
          label: '维修员'
        }
      ],
      area: [ // 下拉框选项
        // {
        //   value: '1',
        //   label: '运营员'
        // },
      ],
      imageUrl: ''
    }
  },
  created() {
    this.getAreaList()
    // console.log(this.title)
    this.imageUrl = this.userInfo.image
  },
  methods: {
    cancel() {
      this.$emit('update:isShow', false)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    async beforeAvatarUpload(file) {
      // console.log(file)
      this.imageUrl = URL.createObjectURL(file)
      const isType = file.type === 'image/png' || file.type === 'image/jpeg'
      const isSize = file.size / 1024 / 1024 < 0.1
      if (!isType) {
        this.$message.error('上传图片只能是JPG或者png格式')
      }
      if (!isSize) {
        this.$message.error('上传图片不能超过100kb')
      }
      const imageFile = new FormData()
      console.log(imageFile)
      imageFile.append('fileName', file)
      const { data } = await uploadImageAPI(imageFile)
      this.userInfo.image = data
      return isType && isSize
    },
    close() {
      // this.dialogTableVisible = false
      this.$emit('update:isShow', false)
    },
    async getAreaList() {
      const { data: { currentPageRecords }} = await areaListAPI()
      for (const k in currentPageRecords) {
        this.areaList.push(currentPageRecords[k].name)
      }
      const arr = []
      this.areaList.map((item, index) => {
        const i = String(index)
        arr.push({ id: i, label: item })
      })
      this.area = Array.from(arr)
      // console.log(this.area)
    },
    async confirmAddUser(a) {
      try {
        await editUserAPI(this.userInfo, a.id)
        this.$message.success('编辑人员成功')
        this.isLoading = true
      } finally {
        this.isLoading = false
        this.$emit('update:isShow', false)
      }
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .cancel{
  color:#000;
  border:none;
  background-color: #fbf4f0;
}
::v-deep .cancel:hover{
  background-color: #f3e7e1;
}
::v-deep .sure{
  border: none;
}
::v-deep .close:hover{
  cursor: pointer;
}
::v-deep .avatar-uploader ::v-deep .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader ::v-deep .el-upload:hover {
    border-color: #ccc;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 76px;
    height: 76px;
    display: block;
  }
  ::v-deep .el-dialog{
    width: 630px;
  }
  ::v-deep .el-dialog__header{
    color:#000;
    font-size: 16px;
    font-weight: 700;
    background-color: #fff;
  }
::v-deep .form{
    .el-input{
    width: 396px;
  }
}
::v-deep .dialog-footer{
  display: flex;
  justify-content: center;
}
</style>
