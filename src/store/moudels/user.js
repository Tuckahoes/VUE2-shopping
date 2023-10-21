import { getInfo, setInfo } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    // 退出登录时清楚VUEX的内容
    logout (context) {
      context.commit('setUserInfo', {})
    }
  },
  getters: {

  }
}
