import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {},
    myChannels: [],
    history: []
  },
  getters: {
    isLogin(state) {
      return !!state.token.token
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_MYCHANNELS(state, payload) {
      state.myChannels = payload
    },
    SET_HISTORY(state, arr) {
      state.history = arr
    }
  },
  actions: {},
  modules: {},
  plugins: [
    createdPersistedstate({
      key: 'HEIMA-TOUTIAO',
      storage: window.localStorage,
      reducer({ token, myChannels, history }) {
        return { token, myChannels, history }
      }
    })
  ]
})
