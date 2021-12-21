<template>
  <div>
    <div class="title Kor">재전송 명령</div>
    <div class="Box">
      <div class="box-title">재전송 명령</div>
      <select class="store" name="select">
        <option>{{filterMenu}}</option>
      </select>
      <input type="text" name="search" id="search" placeholder="저울코드 검색" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <div class="btn" >
        <button @click="resultData()">재전송</button>
      </div>
      
      <table>
        <tr>
          <th><input type="checkbox" @click="selectAll" v-model="allSelected"/></th>
          <th>저울코드</th>
          <th>전송업무코드</th>
          <th>전송여부</th>
          <th>최종전송일시</th>
        </tr>
        <tr v-for="(i, index) in sendResultList" :key="i.scaleCode">
          <td><input type="checkbox" v-model="i.checkbox" @click="select(index)" :value="i.checkbox"/></td>
          <td>{{i.scaleCode}}</td>
          <td>{{i.sendTaskCode != null ? filterMenu = task[parseInt(i.sendTaskCode)-1] : 'X'}}</td>
          <td>{{i.sendYn}}</td>
          <td>{{i.chgDt == "" ? '...' : i.chgDt}}</td>
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
    return{
      sendResultList : [],
      search: "",
      filterMenu: [],
      task: ['저울 상품', '도축장', '용도', '판매종료', '위해 개체', '생산 등록', '가격 변경', '단축키 전송'],
      checkbox : [],
      allSelected: false,
      checkList: []
    }
  },
  methods: {
    resultCall() {
      axios({
        url: "http://172.16.18.116:8080/scaleSendResult",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        for (var i in res.data.data){
          res.data.data[i].checkbox = false;
        }
        this.sendResultList = res.data.data
        console.log(this.sendResultList)
      }).catch(res => {

      });
    },
    resendData() {
      axios({
        url: "http://172.16.18.116:8080/scaleSendResult/updateDate",
        method: "POST",
        data: this.sendResultList
      }).then(res => {
        console.log('resendData', res.data.data)
        this.resultCall();
      }).catch(res => {

      });
    },
    resultData() {
      var dataResult = this.sendResultList.filter(items => items.checkbox == true); 
      console.log('dataResult', dataResult)
      axios({
        url: "http://172.16.18.116:8080/scaleSendResult/send",
        method: "POST",
        data: dataResult
      }).then(res => {
        console.log('resultData', res.data.data);
        this.resultCall();
        // setTimeout(()=>{
        //   this.resendData();
        // }, 3000)
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
        });
      }else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(()=> {
          this.resultCall()
        });
      }
    },
    selectAll(){
      this.checkbox = [];
      if(this.allSelected == true){
        this.allSelected = false;
      }else{
        this.allSelected = true;
      } 

      console.log('this.allSelected', this.allSelected)
      if(this.allSelected){
        for(var i in this.sendResultList){
          this.sendResultList[i].checkbox = true;
          this.checkbox.push(this.sendResultList[i].checkbox);
        };
        console.log('true  this.checkbox', this.checkbox)
      }else{
        for(var i in this.sendResultList){
          this.sendResultList[i].checkbox = false;
          this.checkbox.push(this.sendResultList[i].checkbox);
        };
        console.log('false this.checkbox', this.checkbox)
      }
    },
    select(index){
      this.sendResultList[index].checkbox = !this.sendResultList[index].checkbox;
    }
  },
  created() {
    this.resultCall()
  }
}
</script>

<style scoped>
#search{
  position: absolute;
  margin-top: 20px;
}
.store{
  width: 115px;
  margin-right: 10px;
}

button {
  margin: -38px;
  margin-right: 37px;
  margin-bottom: 10px;
  cursor: pointer;
  float: right;
  background-color: #003366;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  text-align: center;
  padding: 8px 16px 8px 16px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
}
</style>