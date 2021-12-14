<template>
  <div>
    <div class="title Eng">Scale</div>
    <div class="Box">
      <div class="box-title">저울 통신 상태</div>
      <select class="store" id="select">
        <option value="" selected disabled hidden>매장</option>
        <option :value="i.strCode" v-for="i in storeFilter" :key="i">{{i}}</option>
      </select>
      <select class="sector" id="select">
        <option value="" selected disabled hidden>부문</option>
        <option :value="i.scaleSectorCode" v-for="i in sectorFilter" :key="i">{{i}}</option>
      </select>
      <input type="text" name="search" id="search" placeholder="Search (StrCode)" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <table>
        <tr>
          <th>매장</th>
          <th>부문</th>
          <th>저울 코드</th>
          <th>IP</th>
          <th>모델명</th>
          <th>저울 버전</th>
          <th>상품 전송 <br>결과</th>
          <th>통신 연결 <br>상태</th>
        </tr>
        <tr v-for="i in scaleList" :key="i.scaleCode">
          <td>{{i.strCode}}</td>
          <td>{{i.scaleSectorCode}}</td>
          <td>{{i.scaleCode}}</td>
          <td>{{i.scaleId}}</td>
          <td>{{i.scaleMhtpCode}}</td>
          <td>{{i.fwrVerNo}}</td>
          <td>상품 전송 결과</td>
          <td>통신 연결 상태</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Select from './piece/Select.vue'
import axios from 'axios'

export default {
  name: "ScaleList",
  data(){
    return{
      scaleList : [],
      search: "",
      storeList: [], storeFilter: [],
      sectorList: [], sectorFilter: []
    }
  },
  methods: {
    scaleCall() {
      axios({
        url: "http://172.16.18.116:8080/scale",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        this.scaleList = res.data.data;
        this.StoreFilter(); this.SectorFilter();
      }).catch(res => {

      });
    },
    SearchInput(e){
      this.search = e.target.value;
      if(this.search.length !== 0){
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const filterList = this.scaleList.filter(items => items.scaleCode.includes(this.search));
          console.log(filterList)
          this.scaleList = filterList;
        }, 100);
      }else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(()=> {
          this.scaleCall()
        });
      }
    },
    StoreFilter(){
      for(var i in this.scaleList){
        this.storeList.push(this.scaleList[i].strCode)
        this.storeFilter = this.storeList.filter((element, index) =>
          this.storeList.indexOf(element) === index
      )}
      console.log('StoreFilter',this.storeList, this.storeFilter.sort())
      return this.storeFilter.sort();
    },
    SectorFilter(){
      for(var i in this.scaleList){
        this.sectorList.push(this.scaleList[i].scaleSectorCode)
        this.sectorFilter = this.sectorList.filter((element, index) =>
          this.sectorList.indexOf(element) === index
      )}
      console.log('SectorFilter',this.sectorList, this.sectorFilter.sort())
      return this.sectorFilter.sort();
    }
  },
  created() {
    this.scaleCall()
  },
  components: {
    'Select' : Select
  }
}
</script>

<style scoped>
#search{
  margin-right: 37px;
  margin-top: 20px;
  float: right;
}
</style>