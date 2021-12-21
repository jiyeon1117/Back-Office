<template>
  <div>  
    <div class="title Eng">Scale</div>
    <div class="Box">
      <div class="box-title">저울 통신 상태</div>
      <select class="store" v-model="store" @input="StoreInput" @change="StoreChange('store')">
        <option value="" selected>매장</option>
        <option :value="i" v-for="i in storeFilter" :key="i">{{i}}</option>
      </select>
      <select class="sector" v-model="sector" @change="StoreChange('department')">
        <option value="" selected>부문</option>
        <option v-for="i in departmentList" :value="i.id" :key="i.id">{{i.name}}</option>
      </select>
      <input type="text" name="search" id="search" placeholder="저울코드" v-model="search" @input="SearchInput" @change="StoreChange('search')">
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
        <tr v-for="i in tableList" :key="i.scaleCode">
          <td>{{i.strCode}}</td>
          <td>{{i.scaleSectorCode}}</td>
          <td>{{i.scaleCode}}</td>
          <td>{{i.scaleIp}}</td>
          <td>{{i.scaleMhtpCode}}</td>
          <td>{{i.fwrVerNo == null ? 'X' : i.fwrVerNo}}</td>
          <td class="clickColor" @click="showModal(i.scaleCode)">{{i.sendYn == '1' ? '성공': '실패'}}</td>
          <td>{{i.scaleComnCmplYn == '1' ? '연결중' : '연결안됨'}}</td>
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
import Select from './piece/Select.vue'
import axios from 'axios'
import _ from 'lodash'

export default {
  name: "ScaleList",
  data(){
    return{
      scaleList : [],
      tableList: [],
      filterData :[],
      search: "", store: "", sector: "",
      storeList: [], storeFilter: [],
      departmentList :[],
      pageNum: 0, pageSize: 5
    }
  },
  computed: {
    pageCount() {
      let listLeng = this.filterData.length,
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
      this.tableList =  this.filterData.slice(start, end);
    },
    scaleCall() {
      axios({
        url: "http://172.16.18.116:8080/scale",
        method: "GET"
      }).then(res => {
        this.scaleList = res.data.data;
        this.tableList = this.scaleList;
        this.filterData = this.tableList;

        console.log('scaleCall', this.scaleList)
        this.StoreFilter();
        
        var lodashList =[];
        lodashList = _.uniqBy(this.tableList, "scaleSectorCode");
        this.departmentList = [];
        for(var i=0 ; i<lodashList.length; i++){
          var object = {id : lodashList[i].scaleSectorCode, name : lodashList[i].scaleSectorCode} ;
          this.departmentList.push(object);
        }
        this.paginatedData();
      }).catch(res => {
        alert('DB 연결이 끊어졌습니다.')
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
    showModal(scaleCode){
      console.log('scaleCode', scaleCode)
      var scaleModal = [];
      scaleModal.scaleCode = scaleCode;
      scaleModal.modalFlag = true;
      this.$store.commit("SET_SCALE_MODAL", scaleModal);
    },
    StoreChange(type){
      if(type == 'store'){
        this.sector = "";
        this.tableList = this.scaleList.filter(items => items.strCode == this.store);
        var lodashList =[];
        lodashList = _.uniqBy(this.tableList, "scaleSectorCode");
        this.departmentList =[];
        for(var i=0; i<lodashList.length; i++){
          var object = {id : lodashList[i].scaleSectorCode, name : lodashList[i].scaleSectorCode};
          this.departmentList.push(object);
        }
        console.log(this.departmentList);
      }

      if(type == 'department'){
        if(this.store == ""){
          if(this.sector == ""){
            this.tableList = this.scaleList;
          }else{
            this.tableList = this.scaleList.filter(items => items.scaleSectorCode == this.sector);
          }
        }else{
          if(this.sector == ""){
            this.tableList = this.scaleList.filter(items => items.strCode == this.store);
          }else{
            this.tableList = this.scaleList.filter(items => items.scaleSectorCode == this.sector && items.strCode == this.store);
          }
        }
      }

      if(type == 'search'){
        if(this.store == ""){
          if(this.sector == ""){
            if(this.search == ""){
              this.tableList = this.scaleList;
            }else{
              this.tableList = this.scaleList.filter(items => items.scaleCode.includes(this.search));
            }
          }
        }else{
          if(this.sector == ""){
            if(this.search == ""){
              this.tableList = this.scaleList;
            }else{
              this.tableList = this.scaleList.filter(items => items.strCode == this.store && items.scaleCode.includes(this.search));
            }
          }else{
            if(this.search == ""){
              this.tableList = this.scaleList;
            }else{
              this.tableList = this.scaleList.filter(items => items.scaleSectorCode == this.sector && items.strCode == this.store && items.scaleCode.includes(this.search));
            }
          }
        }
      }

      if(this.pageNum >= this.pageCount){
        this.pageNum = 0;
      }

      this.filterData = this.tableList;      
    },
    SearchInput(e){
      this.search = e.target.value;
      console.log('SearchInput', this.search);
      if(this.search.length !== 0){
        const filterList = this.tableList.filter(items => items.scaleCode.includes(this.search));
        console.log('SearchInput filterList ', filterList)
        this.tableList = filterList;
      }else {
        this.store = "";
        this.sector = "";
        this.scaleCall();
      }
    },
    StoreInput(e){
      this.store = e.target.value;
      console.log('StoreInput', this.store);
      if(this.store.length !== 0){
        const filterList = this.scaleList.filter(items => items.strCode == this.store);
        console.log(filterList);
        this.tableList = filterList;
      }else {
        this.scaleCall();
      }
    },
    StoreFilter(){
      this.storeList = [];
      for(var i in this.scaleList){
        this.storeList.push(this.scaleList[i].strCode);
      }
      this.storeFilter = this.storeList.filter((element, index) => this.storeList.indexOf(element) === index).sort();
      console.log('StoreFilter', this.storeFilter);
      return this.storeFilter;
    },
  },
  created() {
    this.scaleCall();
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