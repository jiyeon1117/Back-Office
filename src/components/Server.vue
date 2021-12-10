<template>
  <div>
    <div class="title Eng">Server</div>
    <div class="Box">
      <div class="box-title">서버 통신 상태</div>
      <Search class="search"></Search>
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
import Search from './piece/Search.vue'
import axios from 'axios'

export default {
  name: "ServerList",
  data(){
    return{
      serverList : []
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
    }
  },
  created() {
    this.serverCall()
  },
  components: {
    'Search' : Search
  }
}
</script>

<style scoped>
.search{
  margin-right: 37px;
  margin-top: -10px;
  float: right;
}
</style>