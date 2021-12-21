<template>
  <div>
    <div class="title Eng">Server</div>
    <div class="Box">
      <div class="box-title">서버 통신 상태</div>
      <input type="text" name="search" id="search" placeholder="서버 검색" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <table>
        <tr>
          <th>서버</th>
          <th>IP</th>
          <th>동작여부</th>
        </tr>
        <tr v-for="i in serverList" :key="i.scaleSvrId">
          <td>{{i.scaleSvrId}}</td>
          <td>{{i.scaleSvrIp}}</td>
          <td>{{i.workYn == '1' ? '정상' : '비정상'}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "ServerList",
  data(){
    return{
      serverList : [],
      search : ""
    }
  },
  methods: {
    serverCall() {
      axios({
        url: "http://172.16.18.116:8080/scaleSvr",
        method: "GET"
      }).then(res => {
        this.serverList = res.data.data
      }).catch(res => {

      });
    },
    SearchInput(e){
      this.search = e.target.value;
      console.log('SearchInput', this.search);
      if(this.search.length !== 0){
        const filterList = this.serverList.filter(items => items.scaleSvrId.includes(this.search));
        console.log('SearchInput filterList : ', filterList)
        this.serverList = filterList;
      }else {
        this.serverCall();
      }
    },
  },
  created() {
    this.serverCall()
  },
  components: {
  }
}
</script>

<style scoped>
#search{
  float: right;
  margin-right: 37px;
  margin-top: -10px;
}
</style>