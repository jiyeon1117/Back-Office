import Vue from 'vue'
import Vuex from 'vuex'

import { apiScale, apiScaleCallBack } from '@/service/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  state: {
    count: 0,
    scaleModal : false,
    scaleCode : 0,
    scheduleModal : false,
    scaleSvrId : "",
    scalePgmId : 0,
    menuBar: true,
    login : true,
    comnStatSendCycleVal : "", 
    allProScaleCntr : "", 
    comnStatDefStartTm : "", 
    comnStatDefEndTm : "", 
    pgmFnlExecDt : "", 
    pgmExecStartTm : "", 
    pgmExecEndTm : ""
  },
  mutations: {
    SET_SCALE_MODAL(state, payload){
      state.scaleModal = payload.modalFlag
      state.scaleCode = payload.scaleCode
    },
    SET_SCHEDULE_MODAL(state, payload){
      state.scheduleModal = payload.modalFlag
      state.scaleSvrId = payload.scaleSvrId
      state.scalePgmId = payload.scalePgmId
      // state.comnStatSendCycleVal = payload.comnStatSendCycleVal
      // state.allProScaleCntr = payload.allProScaleCntr
      // state.comnStatDefStartTm = payload.comnStatDefStartTm
      // state.comnStatDefEndTm = payload.comnStatDefEndTm
      // state.pgmFnlExecDt = payload.pgmFnlExecDt
      // state.pgmExecStartTm = payload.pgmExecStartTm
      // state.pgmExecEndTm = payload.pgmExecEndTm
    },
    SET_MENU(state, payload){
      state.menuBar = payload.bar
    },
    SET_LOGIN(state, payload){
      state.login = payload.loginYn
    }
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