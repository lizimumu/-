<template>
  <div class="navbar">
    <!-- <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->

    <div class="login">  <img src="@/assets/common/logoone.png" class="sidebar-logo"></div>
    <div class="right">
      <div><img src="../../assets/common/user.png" alt=""></div>
      <div class="user">欢迎你,<span style="margin-left: 8px;">{{ $store.state.user. userInfo.userName }}</span></div>
      <el-tooltip content="退出登录" placement="top" class="tuichu">
        <span @click="quit">退出 <i
          class="el-icon-caret-bottom"
        /><span />
        </span></el-tooltip>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import Hamburger from '@/components/Hamburger'
import { getUserInfoAPI } from '@/api/user'

export default {
  components: {
    // Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    console.log(this.$store.state.user.data.userId)
    this.getUserInfo()
  },
  methods: {
    quit() {
      this.$store.commit('user/REMOVE_TOKEN')
      this.$router.push('/login')
    },
    async getUserInfo() {
      const { data } = await getUserInfoAPI(this.$store.state.user.data.userId)
      console.log(data)
      this.$store.commit('user/SET_USER_INFO', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  // overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 666;
  background: #fff;
  // background:#5373e0;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background-image: url('../.././assets/common/backgroundone.png');
width: 100%;
.login{
  width: 88px;
  height: 35px;
  margin-left: 15px;
  margin-top: 10px;
  img{
    width: 100%;
    height: 100%;
  }}
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .right{
    display: flex;
  width: 270px;
  float: right;
  display: flex;
  height: 60px !important;
  align-items: center;
justify-content: space-between;
  // background-color:yellow;
  margin-top: -45px;
  .user{
    color: #fff;
    font-size: 16px;
    margin-right: 20px;

  }
.tuichu{

  color: #fff;
  display: inline-block;
// margin-left: ;
margin-right: 20px;
}
}
}
</style>
