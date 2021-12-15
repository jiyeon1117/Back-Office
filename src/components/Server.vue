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
          <td>동작여부</td>
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
        console.log(res.data.data)
        this.serverList = res.data.data
      }).catch(res => {

      });
    },
    SearchInput(e){
      this.search = e.target.value;
      if(this.search.length !== 0){
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const filterList = this.serverList.filter(items => items.scaleSvrId.includes(this.search));
          console.log(filterList)
          this.serverList = filterList;
        }, 100);
      }else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(()=> {
          this.scaleCall()
        });
      }
    }
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