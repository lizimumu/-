<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title"><img src="../../assets/common/logo.png" alt=""></h3>
      </div>
      <el-form-item prop="loginName" class="item-phone">
        <span
          class="el-icon-mobile-phone"
        />
        <el-input v-model="loginForm.loginName" placeholder="请输入手机号码" />
      </el-form-item>
      <el-form-item prop="password">
        <!-- 密码的图片 -->
        <span
          class="el-icon-lock"
        />
        <!-- 密码框 -->
        <el-input ref="pwd" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" autofocus />
        <!-- !-- 眼睛的图片svg-icon比较特殊要用别的标签包起来，不然不生效 -->
        <span class="svg-container" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye':'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item prop="code">
        <span
          class="iconfont icon-anquan"
        />
        <el-input ref="pwd" v-model="loginForm.code" :type="passwordType" placeholder="请输入验证码" class="yzm-ipt" />
        <div class="yzm-img" @click="clickCode"><img :src="imgSrc" alt=""></div>
      </el-form-item>
      <el-button :loading="loading" class="loginBtn" @click="login">登录</el-button>
    </el-form></div>
</template>

<script>
import { getImgCode } from '@/api/login'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0
      },
      imgSrc: '',
      rules: {
        loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '密码格式不对', trigger: 'blur' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }

        ]
      }

    }
  },
  created() {
    this.getCode()
  },
  methods: {

    showPwd() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
      this.$nextTick(() => {
        this.$refs.pwd.focus()
      })
    },
    async getCode() {
      const radomNum = Math.round(Math.random() * 9000) + 1000
      console.log(radomNum)
      const res = await getImgCode(radomNum)
      console.log(res)
      this.loginForm.clientToken = radomNum
      // console.log(res.request.responseURL)
      this.imgSrc = res.request.responseURL
    },
    clickCode() {
      this.getCode()
    },
    async login() {
      try {
        if (this.loginForm === 0) return
        this.loading = true
        await this.$store.dispatch('user/loginActions', this.loginForm)
        if (this.$store.state.user.data.success === false) {
          this.$message.error(this.$store.state.user.data.msg)
          return
        }

        this.$router.push({
          path: '/'
        })
      } catch (e) {
        console.log(555)
      } finally {
        this.loading = false
      }
    }
  }

}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #333;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/common/background.png'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕

  .el-input {
    display: inline-block;
    height: 47px;
    width: 82%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 0px;

      height: 47px;
      caret-color: $cursor;
   margin-left: -6px;
    color:#333;
    height: 47px;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    width: 446px;
height: 52px;
background-color:#fff;
margin:25px auto;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    background-color: #fff;
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    border-radius: 10px;
    // padding: 160px 35px 0;
    .loginBtn{
      background-color: pink;
      width: 448px;
      height: 52px;
      display: inline-block;
      margin-left: 36px;
      background-color: #4a66e6;
      line-height: 25px;
      text-align: center;
      color: #fff;
      border-radius: 8px;
    }

  }
.el-icon-lock,
.el-icon-mobile-phone,
.icon-anquan{
  margin-left: 20px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    font-size: 15px;
}
.svg-icon{
  font-size: 18px;
  margin-right: 5px;
  display: inline-block;
margin-bottom: -5px;
  // margin-top: 20px;
}
  .title-container {
    position: relative;

    .title {
      width: 98px;
      height: 98px;
    margin-left: 50%;
      transform: translateX(-50%) ;
      margin-top: -50px;

      img{
        width:100%;
        height: 100%;
      }

    }
  }
.yan-zheng-ma{
width: 200px;
background-color:270px;

}
.yzm-ipt{
  width: 260px;
}
.yzm-img{
  width: 130px;
  height: 50px;
     border: 1px solid #80a07b;
    float: right;

}

}

</style>
