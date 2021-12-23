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
      <div class="pagaBtn">
        <button :disabled="pageNum === 0" @click="prevPage"><img class="left" :src="require(`@/assets/arrow-left.png`)"/></button>
        <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} page</span>
        <button :disabled="pageNum >= pageCount - 1" @click="nextPage"><img class="right" :src="require(`@/assets/arrow-right.png`)"/></button>
      </div>
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
      search : "",
      pageNum: 0, pageSize: 5,
      tableList: []
    }
  },
  computed: {
    pageCount() {
      let listLeng = this.serverList.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng/listSize);
      if(listLeng % listSize > 0) page += 1;
      return page;
    }
  },
  methods: {
    paginatedData() {
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
      this.tableList =  this.serverList.slice(start, end);
    },
    serverCall() {
      axios({
        url: "http://172.16.18.116:8080/scaleSvr",
        method: "GET"
      }).then(res => {
        this.serverList = res.data.data;
        this.paginatedData();
      }).catch(res => {

      });
    },
    nextPage () {
      this.pageNum += 1;
      this.paginatedData();
    },
    prevPage () {
      this.pageNum -= 1;
      this.paginatedData();
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
  }
}
</script>

<style scoped>
#search{
  float: right;
  margin-right: 37px;
  margin-top: -10px;
}
.pagaBtn{
  display: flex;
  margin-top: 30px;
  align-items: center;
  justify-content: center;
}
.page-count{
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 300;
}
button{
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
}
img{
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 5px;
  width: 19px;
}
</style>