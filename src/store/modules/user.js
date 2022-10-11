import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null,
    data: {},
    hrsaaTime: '',
    userInfo: '',
    dmdUserInfo: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },

    SET_DATA(state, data) {
      state.data = data
    },
    REMOVE_TOKEN(state) {
      console.log(8888)
      state.token = null
      state.data = {}
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data
    },
    SET_HASAAS_TIME(state, hrsaaTime) {
      state.hrsaaTime = hrsaaTime
    },
    SET_DMDUSERINFO(state, data) {
      state.dmdUserInfo = data
    }
  },
  // 发送异步请求
  actions: {
    async loginActions({ commit }, loginData) {
      const { data } = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data.token)
      commit('SET_DATA', data)
      // 第一次登录把登录的事件戳存起来，后面使用
      commit('SET_HASAAS_TIME', new Date().getTime())
    }
  }
}
