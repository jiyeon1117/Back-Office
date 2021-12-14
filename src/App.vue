<template>
  <div id="app">
    <Header></Header>
    <Menu></Menu>
    <Body></Body>
    <ScaleModal></ScaleModal>
    <ScheduleModal></ScheduleModal>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Body from './components/Body.vue'
import ScaleModal from './components/ScaleModal.vue'
import ScheduleModal from './components/ScheduleModal.vue'


export default {
  name: 'App',
  data(){
    return {
    }
  },
  components: {
    'Header' : Header,
    'Menu' : Menu,
    'Body' : Body,
    'ScaleModal' : ScaleModal,
    'ScheduleModal' : ScheduleModal
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
  font-size: 44px;
  font-weight: 500;
}
.Eng {
  font-family: 'Roboto', sans-serif;
  margin: 40px 0px 0px 45px;
}
.Kor {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 40px;
  font-weight: 700;
  margin: 35px 0px 0px 45px;
}
/* 박스 관련  */
.Box {
  position: relative;
  padding: 0px 0px 40px 0px;
  margin: 30px 0px 0px 45px;
  width: 1100px;
  height: 100%;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(61, 36, 36, 0.2);
}
.box-title{
  margin: 30px 0px 0px 37px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 28px;
  color: #003366;
}
/* 테이블 관련 */
table {
  margin: 10px 0px 0px 37px;
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
  margin: 20px 0px 0px 37px;
}
.sector{
  margin: 20px 0px 0px 5px;
}
/* 모달 */
.black-bg{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
}
.white-bg{
  background-color: white;
  border: 8px;
  padding: 10px;
}
#select{
  width: 100px;
  height: 37px;
  border: 2px solid #003366;
  border-radius: 10px;
  padding-left: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #003366;
  outline: none;
  vertical-align: middle;
}

#search{
  width: 192px;
  height: 34px;
  margin-bottom: 10px;
  border: 2px solid #E1E7EE;
  border-radius: 10px;
  background-color: #F5F8FA;

  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 17px;
  outline: none;
  padding-left: 8px;
}
input::placeholder {
  color: #557EA7;
}
</style>
