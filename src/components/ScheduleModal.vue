<template>
  <div class="black-bg" v-if="Modal == true">
      <div class="white-bg">
        <button class="imgbtn" @click="Modal = false"><img :src="imgSrc" class="img"></button>
        <div class="box-title">스케쥴 설정</div>

        <div class="text Kor">저울코드 / 서버 프로그램</div>
        
        <div class="text Kor">통신상태전송주기</div>
        <input type="text" name="a" class="input" placeholder="통신상태전송주기">
      
        <div class="text Kor">일괄처리저울대수</div>
        <input type="text" name="b" class="input" placeholder="일괄처리저울대수">
        
        <div class="text Kor">통신상태확인시각</div>
        <input type="text" name="c" class="input" placeholder="통신상태확인시각">
        
        <div class="text Kor">프로그램최종실행일시</div>
        <input type="text" name="d" class="input" placeholder="프로그램최종실행일시">
        
        <div class="text Kor">프로그램실행시각</div>
        <input type="text" name="e" class="input" placeholder="프로그램실행시각">
        
        <button class="modalbtn apply">확인</button>
        <button class="modalbtn cancle">취소</button>
      </div>
    </div>
</template>
<script>
import Button from './piece/Button.vue'
export default {
  data(){
    return {
      Modal : true,
      imgSrc : require('../assets/close.png')
    }
  },
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
  width: 532px;
  height: 770px;
}

.Kor {
  margin-top: 25px;
  margin-left: 30px;
  font-size: 20px;
  font-weight: 300;
}

.input{
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