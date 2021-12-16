import Vue from 'vue'
import Vuex from 'vuex'

import { apiScale, apiScaleCallBack } from '@/service/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  state: {
    scale: null,
    count: 0,
    scaleModal : false,
    scaleCode : 0,
    scheduleModal : false,
    scaleSvrId : "",
    scalePgmId : 0
  },
  mutations: {
    SET_SCALE(state, payload){
      state.scale = payload.data
      state.count = payload.data.length
    },
    SET_SCALE_MODAL(state, payload){
      state.scaleModal = payload.modalFlag
      state.scaleCode = payload.scaleCode
    },
    SET_SCHEDULE_MODAL(state, payload){
      state.scheduleModal = payload.modalFlag
      state.scaleSvrId = payload.scaleSvrId
      state.scalePgmId = payload.scalePgmId
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