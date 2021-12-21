<template>
  <div class="black-bg">
      <div class="white-bg">
        <button class="imgbtn" @click="hiddenModal()"><img :src="require('../assets/close.png')" class="img"></button>
        <div class="box-title">스케쥴 설정</div>

        <div class="text Kor">저울코드 : {{scaleSvrId}} / 서버 프로그램 : {{scalePgmId}}</div>

        <div class="text Kor">통신 상태 전송 주기</div>
        <input type="text" v-model="form.comnStatSendCycleVal" placeholder="통신 상태 전송 주기">
      
        <div class="text Kor">일괄 처리 저울 대수</div>
        <input type="text" v-model="form.allProScaleCntr" placeholder="일괄 처리 저울 대수">

        <div class="text Kor">통신 상태 확인 시작 시각</div>
        <input type="text" v-model="form.comnStatDefStartTm" placeholder="통신상태 시작 확인 시각">
        
        <div class="text Kor">통신 상태 확인 종료 시각</div>
        <input type="text" v-model="form.comnStatDefEndTm" placeholder="통신상태 종료 확인 시각">
        
        <div class="text Kor">프로그램 최종 실행 일시</div>
        <input type="text" v-model="form.pgmFnlExecDt" placeholder="프로그램 최종 실행 일시">
        
        <div class="text Kor">프로그램 실행시작 시각</div>
        <input type="text" v-model="form.pgmExecStartTm" placeholder="프로그램 실행시작 시각">

        <div class="text Kor">프로그램 실행종료 시각</div>
        <input type="text" v-model="form.pgmExecEndTm" placeholder="프로그램 실행종료 시각">
        
        <button class="modalbtn apply" @click="submit()">확인</button>
        <button class="modalbtn cancle" @click="hiddenModal()">취소</button>
      </div>
    </div>
</template>

<script>
import Button from './piece/Button.vue'
import axios from 'axios'

import { mapState } from 'vuex'
export default {
  computed :{
    ...mapState(['scheduleModal','scaleSvrId', 'scalePgmId'])
  },
  data(){
    return {
      form: {
        comnStatSendCycleVal: 0,
        allProScaleCntr: 0,
        comnStatDefStartTm: "",
        comnStatDefEndTm: "",
        pgmFnlExecDt: "",
        pgmExecStartTm: "",
        pgmExecEndTm: "",
      }
    }
  },
  methods: {
    hiddenModal(){
      this.$store.commit("SET_SCHEDULE_MODAL", false);
    },
    submit(){
      this.form.scaleSvrId = this.scaleSvrId;
      this.form.scalePgmId = this.scalePgmId;
      console.log('comnStatSendCycleVal', this.form.comnStatSendCycleVal)
      console.log('allProScaleCntr', this.form.allProScaleCntr);
      console.log('comnStatDefStartTm', this.form.comnStatDefStartTm);
      console.log('comnStatDefEndTm', this.form.comnStatDefEndTm);
      console.log('pgmFnlExecDt', this.form.pgmFnlExecDt);
      console.log('pgmExecStartTm', this.form.pgmExecStartTm);
      console.log('pgmExecEndTm', this.form.pgmExecEndTm);
      console.log('this.scaleSvrId, this.scalePgmId',this.form.scaleSvrId, this.form.scalePgmId);
      this.batchPost();
      this.$store.commit("SET_SCHEDULE_MODAL", false);
    },
    batchPost(){
      axios.put('http://172.16.18.116:8080/scaleSvrBatch', this.form)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        });
    },
  },
  // created() {
  //   this.batchPost();
  // },
  components: {
    'Button' : Button
  }
}
</script>

<style scoped>
.box-title{
  margin-left: 29px;
  font-size: 28px;
}

.white-bg{
  border-radius: 10px;
  width: 532px;
  height: 1000px;
}

.Kor {
  margin-top: 25px;
  margin-left: 30px;
  font-size: 20px;
  font-weight: 300;
}

input{
  width: 454px;
  height: 45px;
  margin-top: 4px;
  margin-left: 30px;
  border: 1.5px solid #003366;
  border-radius: 10px;
  color: #334554;
  font-size: 20px;
  outline: none;
  padding-left: 12px;
}

.img{
  width: 20px;
}

.imgbtn {
  background-color: transparent;
  width: 30px;
  height: 25px;
  margin-right: 10px;
}

button{
  float: right;
  cursor: pointer;
  border: none;
}

.modalbtn{
  padding: 8px 16px 8px 16px;
  font-size: 18px;
  border-radius: 10px;
  margin-top: 40px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
}

.apply {
  width: 80px;
  height: 44px;
  margin-right: 32px;
  background-color: #003366;
  color: white;
}

.cancle {
  width: 80px;
  height: 43px;
  margin-right: 15px;
  background-color: white;
  color: #003366;
  border: 2px solid #003366;
}
</style>