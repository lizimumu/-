import router from '@/router'
import store from '@/store'
// 配置路由守卫
// 判断token是不是存在 跳转到相应页面

const whiteList = ['/login', '/404'] /* 定义白名单，不需要token也可以访问 */
// !路由前置守卫 对路由进跳转项控制 ，监视全局路由跳转权限
// 回调函数接受三个参数，to去哪里，from从哪里来，next()放行必须调用，改为false拦截，终止跳转
router.beforeEach((to, from, next) => {
  // console.log(store.getters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/home')
    } else {
      // 有token去的不是不是登录页直接放行
      next()
    }
  } else {
    // 没有token,还去白名单，直接放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 没token还不在被白名单直接让去登录
      next('/login')
    }
  }
})

