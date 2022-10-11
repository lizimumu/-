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
        ref="par"
        v-loading="isLoading"
        :model="userInfo"
        :rules="rules"
        label-position="right"
        label-width="120px"
        class="form"
      >
        <el-form-item label="人员名称：" prop="userName">
          <el-input
            v-model="userInfo.userName"
            type="text"
            placeholder="请输入"
            maxlength="5"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="角色：" prop="roleId">
          <template>
            <el-select
              v-model="userInfo.roleName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.label"
                :value="item.id"
              />
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="联系电话：" prop="mobile">
          <el-input
            v-model="userInfo.mobile"
            type="text"
            placeholder="请输入"
            maxlength="11"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="负责区域：" prop="regionName">
          <template>
            <el-select
              v-model="userInfo.regionName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in areaList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              /></el-select>
          </template>
        </el-form-item>
        <el-form-item label="头像：" prop="image">
          <div class="el-upload-img">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
              <div slot="tip" class="el-upload__tip">支持扩展名：jpg、png，文件不得大于100kb</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-checkbox v-model="checked">是否启用</el-checkbox>
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
import { areaListAPI, addUserAPI, uploadImageAPI, getUserListAPI } from '@/api/dmd_user'
export default {
  name: 'UploadImg',
  props: {
    isShow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const valiImg = (rule, value, callback) => {
      if (!this.imageUrl) {
        callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }
    const valiName = (rule, value, callback) => {
      if (value === this.userNameList) {
        callback(new Error('名称已经存在'))
      } else {
        callback()
      }
    }
    return {
      dialogTableVisible: '',
      areaList: [],
      isLoading: false,
      checked: false,
      userList: [],
      userNameList: [],
      userInfo: {
        userName: '',
        roleId: '',
        roleName: '',
        mobile: '',
        regionId: '',
        regionName: '',
        status: '',
        image: ''
      },
      rules: { // 表单验证
        userName: [
          {
            required: true,
            message: '请输入人员名称',
            trigger: 'blur'
          },
          {
            required: true,
            validator: valiName
          }
        ],
        mobile: [
          {
            // required: true,
            message: '请输入人员电话',
            trigger: 'blur'
          },
          {
            required: true,
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: '请输入人员角色',
            trigger: 'blur'
          }
        ],
        regionName: [
          {
            required: true,
            message: '请输入人员负责区域',
            trigger: 'blur'
          }
        ],
        image: [
          {
            required: true,
            message: '支持扩展名：jpg、png，文件不得大于100kb',
            trigger: 'blur'
          },
          {
            required: true,
            validator: valiImg,
            trigger: 'change'
          }
        ]
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
      imageUrl: ''
    }
  },
  watch: {
    isShow: {
      handler(newVal) {
        this.dialogTableVisible = newVal
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getAreaList()
    this.getUserList()
    console.log(this.options)
  },
  methods: {
    async getUserList() {
      const { data: { currentPageRecords }} = await getUserListAPI()
      // console.log(currentPageRecords)
      this.userList = JSON.parse(JSON.stringify(currentPageRecords))
      for (const k in this.userList) {
        // console.log(this.userList[k].userName)
        this.userNameList.push(this.userList[k].userName)
      }
      console.log(this.userNameList)
    },
    cancel() {
      this.$emit('update:isShow', false)
      this.$refs.userInfo.resetFields()
    },
    async beforeAvatarUpload(file) {
      console.log(file)
      this.imageUrl = URL.createObjectURL(file)
      const isJPG = file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 0.1
      if (!isJPG) {
        this.$message.error('上传图片只能是JPG或者png格式')
      }
      if (!isLt2M) {
        this.$message.error('上传图片不能超过100kb')
      }
      const imgFile = new FormData()
      imgFile.append('fileName', file)
      const { data } = await uploadImageAPI(imgFile)
      this.userInfo.image = data
      return isJPG && isLt2M
    },
    close() {
      this.$emit('update:isShow', false)
      // this.cancel()
      console.log(123)
      this.$refs.par.resetFields()
      this.userInfo = {
        userName: '',
        roleId: '',
        roleName: '',
        mobile: '',
        regionId: '',
        regionName: '',
        status: '',
        image: ''
      }
      this.imageUrl = ''
    },
    async getAreaList() {
      const { data: { currentPageRecords }} = await areaListAPI()
      this.areaList = currentPageRecords
    },
    async confirmAddUser() {
      this.areaList.forEach(item => {
        if (this.userInfo.regionName === item.name) {
          this.userInfo.regionId =
        item.id
        }
      })
      this.userInfo.roleName === '运营员'
        ? this.userInfo.roleId = 1 : this.userInfo.roleId = 2
      this.userInfo.status = this.checked

      try {
        await this.$refs.par.validate()
        await addUserAPI(this.userInfo)
        this.$message.success('添加人员成功')
        this.isLoading = true
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
        this.$emit('update:isShow', false)
      }

      // this.$refs.userInfo.resetFields()
      // console.log(this.userInfo)
      this.$emit('father')
      this.close()
      // console.log(123)
      // this.$refs.par.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .cancel{
  color:#000 !important;
  border:none;
  background-color: #fbf4f0 !important;
}
::v-deep .cancel:hover{
  background-color: #f3e7e1 !important;
}
::v-deep .sure{
  background-color: #66b1ff !important;
  border: none;
}
::v-deep .close:hover{
  cursor: pointer;
}
::v-deep .el-upload{
  width: 76px;
  height: 76px;
  text-align: center !important;
}
::v-deep .el-icon-plus{
  width: 16px !important;
  height: 16px !important;
  color:#8c8c8c !important;
}
::v-deep .avatar{
  width: 76px !important;
  height: 76px !important;
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
::v-deep .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  ::v-deep .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  ::v-deep .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  ::v-deep .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
