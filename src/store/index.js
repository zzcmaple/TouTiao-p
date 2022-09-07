import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: {}
  },
  getters: {},
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    }
  },
  actions: {},
  modules: {}
})
