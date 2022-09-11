import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {}
  },
  getters: {
    isLogin(state) {
      return !!state.token.token
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createdPersistedstate({
      key: 'HEIMA-TOUTIAO',
      storage: window.localStorage,
      reducer({ token }) {
        return { token }
      }
    })
  ]
})
