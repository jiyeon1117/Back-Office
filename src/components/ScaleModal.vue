<template>
  <div class="black-bg" v-if="Modal == true">
      <div class="white-bg">
        <button @click="Modal = false"><img :src="imgSrc" class="img"></button>
        <div class="box-title">전송 결과</div>
        <input type="text" name="search" id="search" placeholder="Search (StrCode)" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
        <table>
          <tr>
            <th>저울 코드</th>
            <th>전송 업무</th>
            <th>전송 여부</th>
            <th>최종 전송 일시</th>
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
import axios from 'axios'

export default {
  name: "SendResultList",
  data(){
    return {
      Modal : true,
      imgSrc : require('../assets/close.png'),
      sendResultList : [],
      search: ""
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
    },
    SearchInput(e){
      this.search = e.target.value;
      if(this.search.length !== 0){
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const filterList = this.sendResultList.filter(items => items.scaleCode.includes(this.search));
          console.log(filterList)
          this.sendResultList = filterList;
        }, 100);
      }else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(()=> {
          this.ResultListCall()
        });
      }
    }

  },
  created() {
    this.ResultListCall()
  },
  components: {
  }
}
</script>

<style scoped>
#search{
  float: right;
  margin-top: -10px;
  margin-right: 30px;
}

.box-title{
  margin-left: 29px;
  font-size: 26px;
}

.white-bg{
  width: 660px;
  padding: 0px 0px 32px 0px;
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