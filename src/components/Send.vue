<template>
  <div>
    <div class="title Kor">재전송 명령</div>
    <div class="Box">
      <div class="box-title">재전송 명령</div>
      <Select class="store"></Select>
      <Select class="sector"></Select>
      <input type="text" name="search" id="search" placeholder="Search (StrCode)" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <Select class="task"></Select>
      <div class="btn">
        <button>Recent</button>
      </div>
      <table>
        <tr>
          <th>저울코드</th>
          <th>전송업무코드</th>
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
import Select from './piece/Select.vue'
import axios from 'axios'

export default {
  name: "SendResultList",
  data(){
    return{
      sendResultList : [],
      search: ""
    }
  },
  methods: {
    resultCall() {
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
          this.resultCall()
        });
      }
    }
  },
  created() {
    this.resultCall()
  },
  components: {
    'Select' : Select
  }
}
</script>

<style scoped>
#search{  
  position: absolute;
  margin-right: 37px;
  margin-top: 20px;
  margin-left: 10px;
}
.task{
  float: right;
  margin: 20px 138px 0px 0px;
}

button {
  margin-top: -37px;
  margin-right: 37px;
  float: right;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  padding: 8px 16px 8px 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}
</style>