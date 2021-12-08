<template>
  <div>
    <div class="title Eng">Setting</div>
    <div class="Box">
      <div class="box-title">DB 연결 정보</div>
      <div class="group">
        <div class="text">기본 작업 DB IP</div>
        <input type="text" name="ip" class="input ip" placeholder="ip">
      </div>
      <div class="group">
        <div class="text after">기본 작업 DB PORT</div>
        <input type="text" name="port" class="input port" placeholder="port">
      </div>
      <div class="group">
        <div class="text after">기본 작업 DB 접속 명령</div>
        <input type="text" name="Command" class="input command" placeholder="command">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.Box{
  height: 360px;
}
.group {
  display: block;  
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 300;
}
.text {
  display: inline-block;
  margin-top: 40px;
  margin-left: 37px;
  font-size: 24px;
}
.after {
  margin-top: 30px;
}
.input{
  margin-left: 88px;
  width: 300px;
  height: 40px;
  border: 1.5px solid #003366;
  border-radius: 10px;
  color: #334554;
  font-size: 20px;
  outline: none;
  padding-left: 12px;
}

.ip{
  margin-left: 160px;
}
.port {
  margin-left: 120px;
}
.command {
  width: 680px;
}

</style>