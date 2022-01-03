<template>
  <div class="side-menu">
    <ul class="margin"><router-link to="/Scale">저울 통신 상태</router-link></ul>
    <ul><router-link to="/Server">서버 통신 상태</router-link></ul>
    <ul><router-link to="/Send" >재전송 명령</router-link></ul>
    <ul><router-link to="/Schedule" >스케쥴 설정</router-link></ul>
    <ul><router-link to="/Setting">DB 연결 정보</router-link></ul>
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
  width: 150px;
  height: calc(100vh - 60px);
}
ul{
  padding: 0;
  margin: 0;
  margin-top: 51px;
  font-size: 18px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  list-style: none;
  color: #6685A3;
}
.margin{
  margin-top: 30px;
}
/* ul li{
  margin: 8px 0px 2px;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
} */
a {
  text-decoration: none;
  color: #6685A3;
}
</style>