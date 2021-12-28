<template>
  <div class="side-menu">
    <ul>
      <router-link to="/Scale">통신상태 확인
        <li>저울 통신 상태</li>
      </router-link>
      <li><router-link to="/Server">서버 통신 상태</router-link></li>
    </ul>
    <ul><router-link to="/Send" >재전송 명령</router-link></ul>
    <ul><router-link to="/Schedule" >스케쥴 설정</router-link></ul>
    <ul><router-link to="/Setting">Setting
      <li>DB 연결 정보</li>
    </router-link></ul>
  </div>
</template>

<script>
export default {
  methods:{
  }
}
</script>

<style scoped>
.router-link-active {
  color: #003366;
  font-weight: 900;
}
.router-link-active li{
  color: #003366;
  font-weight: 900;
}
.side-menu {
  float: left;
  margin: 0;
  margin-top: 10px;
  width: 230px;
  height: calc(100vh - 90px);
}
ul{
  font-size: 24px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  list-style: none;
  color: #6685A3;
}
ul li{
  margin: 8px 0px 2px;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
}
a {
  text-decoration: none;
  color: #6685A3;
}
</style>