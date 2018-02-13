import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    song: {
      url: ''
    },
    setting: {
      lrcWindow: false
    }
  },
  mutations: {
    SET_SONG (state, payload) {
      state.song = payload
    },
    SET_SETTING (state, payload) {
      state.setting = payload
    },
    SET_SETTING_BY (state, payload) {
      Object.keys(payload).forEach(key => {
        state.setting[key] = payload[key]
      })
    }
  }
})
export default store
