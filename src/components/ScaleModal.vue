<template>
  <div class="black-bg" v-if="Modal == true">
      <div class="white-bg">
        <button @click="Modal = false"><img :src="imgSrc" class="img"></button>
        <div class="box-title">전송 결과</div>
        <Search class="Search"></Search>
        <table>
          <tr>
            <th>저울코드</th>
            <th>전송업무</th>
            <th>전송여부</th>
            <th>최종전송일시</th>
          </tr>
          <tr v-for="i in sendResultList" :key="i.scaleCode">
          <td>{{i.scaleCode}}</td>
          <td>{{i.sendTaskCode}}</td>
          <td>{{i.sendYn}}</td>
          <td>{{i.fnlSendDt}}</td>
        </tr>
        </table>
      </div>
    </div>
</template>

<script>
import Search from './piece/Search.vue'
import axios from 'axios'

export default {
  name: "SendResultList",
  data(){
    return {
      Modal : true,
      imgSrc : require('../assets/close.png'),
      sendResultList : []
    }
  },
  methods: {
    ResultListCall() {
      axios({
        url: "http://172.16.18.116:8080/scaleSendResult",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        this.sendResultList = res.data.data
      }).catch(res => {

      });
    }
  },
  created() {
    this.ResultListCall()
  },
  components: {
    'Search' : Search
  }
}
</script>

<style scoped>
.box-title{
  margin-left: 29px;
  font-size: 26px;
}

.white-bg{
  width: 660px;
  height: 440px;
}

.Search{
  float: right;
  margin-top: -10px;
  margin-right: 30px;
}

table {
  width: 600px;
  height: 260px;
  margin-right: auto;
  margin-left: auto;

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

.img{
  width: 20px;
}

button{
  background-color: transparent;
  float: right;
  width: 30px;
  height: 25px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
}
</style>