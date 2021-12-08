<template>
  <div id="app">
    <Header></Header>
    <Menu></Menu>
    <Body></Body>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Body from './components/Body.vue'

export default {
  name: 'App',
  components: {
    'Header' : Header,
    'Menu' : Menu,
    'Body' : Body
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap');

body {
  margin: 0;
}
/* title 관련 */
.title{
  color: #003366;
  font-size: 48px;
  font-weight: 500;
}
.Eng {
  font-family: 'Roboto', sans-serif;
  margin: 50px 0px 0px 45px;
}
.Kor {
  font-family: 'Noto Sans KR', sans-serif;
  margin: 45px 0px 0px 45px;
  font-size: 44px;
  font-weight: 700;
}
/* 박스 관련  */
.Box {
  position: relative;
  margin: 35px 0px 0px 45px;
  width: 1100px;
  height: 684px;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(61, 36, 36, 0.2);
}
.box-title{
  margin: 30px 0px 0px 37px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 30px;
  color: #003366;
}
/* 테이블 관련 */
table {
  width: 1026px;
  height: 450px;
  table-layout: fixed; 
  border: 1px solid #E1E7EE;
  border-collapse: collapse;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}
th{
  height: 45px;
  color: white;
  font-size: 15pt;
  font-weight: 500;
  border: 10px soild white;
  background-color: #003366;
}
tr{
  height: 44px;
  border-radius: 10px;
  border-bottom: 1px solid #E1E7EE;
}
td{
  font-size: 14pt;
  color: #374554;
  font-weight: 500;
}
/* 필터 */
.store{
  margin: 15px 0px 0px 37px;
}
.sector{
  margin: 15px 0px 0px 10px;
}
</style>
