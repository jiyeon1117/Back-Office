import Vue from 'vue'
import Vuex from 'vuex'

import { apiScale, apiScaleCallBack } from '@/service/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  state: {
    scale: null,
    count: 0,
    smodal : false,
    smodalNum : 0
  },
  mutations: {
    SET_SCALE(state, payload){
      state.scale = payload.data
      state.count = payload.data.length
    },
    SET_MODAL(state, payload){
      state.smodal = payload.modalFlag
      state.smodalNum = payload.num
    },

  },
  getters: {
    count(state, getters){
      return getters.memo + state.count;
    },
    memo(state){
      return '현재갯수'
    },
  },
  actions: {
    SCALE_INIT({commit}, params){
      apiScale(commit, params)
    },
    SCALE_CALLBACK({}, params){
      apiScaleCallBack(params)
    }
  }
})

export default store