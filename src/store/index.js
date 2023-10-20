import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/moudels/user'
import cart from '@/store/moudels/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart
  }
})
