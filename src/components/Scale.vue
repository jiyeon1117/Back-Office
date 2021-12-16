<template>
  <div>  
    <div class="title Eng">Scale</div>
    <div class="Box">
      <div class="box-title">저울 통신 상태</div>
      <select class="store" id="select" v-model="store" @input="StoreInput">
        <option value="" selected disabled hidden>매장</option>
        <option :value="i" v-for="i in storeFilter" :key="i">{{i}}</option>
      </select>
      <select class="sector" id="select" v-model="sector" @input="SectorInput">
        <option value="" selected disabled hidden>부문</option>
        <option :value="i" v-for="i in sectorFilter" :key="i">{{i}}</option>
      </select>
      <input type="text" name="search" id="search" placeholder="저울코드" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <table>
        <tr>
          <th>매장</th>
          <th>부문</th>
          <th>저울 코드</th>
          <th>IP</th>
          <th>모델명</th>
          <th>저울 버전</th>
          <th>상품 전송 결과</th>
          <th>통신 연결 상태</th>
        </tr>
        <tr v-for="i in scaleList" :key="i.scaleCode">
          <td>{{i.strCode}}</td>
          <td>{{i.scaleSectorCode}}</td>
          <td>{{i.scaleCode}}</td>
          <td>{{i.scaleIp}}</td>
          <td>{{i.scaleMhtpCode}}</td>
          <td>{{i.fwrVerNo == null ? 'X' : i.fwrVerNo}}</td>
          <td @click="showModal(i.scaleCode)">{{i.sendYn == '1' ? '성공': '실패'}}</td>
          <!-- <td><router-link to='/ScaleModal'>{{i.sendYn == '1' ? '성공': '실패'}}</router-link></td> -->
          <!-- <td><router-link to="/ScaleModal" v-if="i.sendYn == '1' ? true : false">{{i.sendYn == '1' ? '전송 성공': 'X'}}</router-link></td> -->
          <td>{{i.scaleComnCmplYn == '1' ? '연결중' : '연결안됨'}}</td>
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
      search: "", store: "", sector: "",
      storeList: [], storeFilter: [],
      sectorList: [], sectorFilter: []
    }
  },
  watch:{
    store(){
      this.scaleCall()
    },
    sector(){
      this.scaleCall()
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
        console.log('scaleCall', this.scaleList)
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
    StoreInput(e){
      this.store = e.target.value;
      console.log('StoreInput', this.store);
      if(this.store.length !== 0){
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const filterList = this.scaleList.filter(items => items.strCode == this.store);
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
    showModal(num){
        console.log(num)
        var sModal = []
        sModal.num = num;
        sModal.modalFlag = true;
        this.$store.commit("SET_MODAL",sModal );
   

    },
    SectorInput(e){
      this.sector = e.target.value;
      console.log('SectorInput', this.sector);
      if(this.sector.length !== 0){
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const filterList = this.scaleList.filter(items => items.scaleSectorCode == this.sector, items.strCode == this.store);
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
      this.storeList = [];
      for(var i in this.scaleList){
        this.storeList.push(this.scaleList[i].strCode)
        this.storeFilter = this.storeList.filter((element, index) =>
          this.storeList.indexOf(element) === index
      )}
      console.log('StoreFilter',this.storeList, this.storeFilter.sort())
      return this.storeFilter.sort();
    },
    SectorFilter(){
      this.sectorList = [];
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