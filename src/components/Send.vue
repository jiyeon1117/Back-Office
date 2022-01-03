<template>
  <div>
    <div class="title Kor">재전송 명령</div>
    <div class="Box">
      <div class="box-title">재전송 명령</div>
      <select class="store" v-model="task" @input="TaskInput">
        <option value="" selected>전체</option>
        <option :value="i" v-for="i in taskFilter" :key="i">{{tasks[parseInt(i)-1]}}</option>
      </select>
      <input type="text" name="search" id="search" placeholder="저울코드 검색" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <button class="button" @click="resultData()">재전송</button>
      <table>
        <tr>
          <th><input type="checkbox" @click="selectAll" v-model="allSelected"/></th>
          <th>저울코드</th>
          <th>전송업무코드</th>
          <th>전송여부</th>
          <th>최종전송일시</th>
        </tr>
        <tr v-for="(i, index) in tableList" :key="index">
          <td><input type="checkbox" v-model="i.checkbox" @click="select(index)" :value="i.checkbox"/></td>
          <td>{{i.scaleCode}}</td>
          <td>{{i.sendTaskCode != null ? tasks[parseInt(i.sendTaskCode)-1] : 'X'}}</td>
          <td>{{i.sendYn}}</td>
          <td>{{i.chgDt == "" ? '...' : i.chgDt}}</td>
        </tr>
      </table>
      <div class="pageBtn">
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
  name: "SendResultList",
  data(){
    return{
      sendResultList : [],
      tableList : [],
      filterData :[],
      search: "", task : "",
      taskList: [], taskFilter : [],
      tasks: ['저울 상품', '도축장', '용도', '판매종료', '위해 개체', '생산 등록', '가격 변경', '단축키 전송'],
      checkbox : [], allSelected: false, checkList: [],
      pageNum: 0, pageSize: 5,
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
    nextPage () {
      this.pageNum += 1;
      this.paginatedData();
    },
    prevPage () {
      this.pageNum -= 1;
      this.paginatedData();
    },
    resultCall() {
      axios({
        url: "http://172.16.18.116:8080/scaleSendResult",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        for (var i in res.data.data){
          res.data.data[i].checkbox = false;
        }
        this.sendResultList = res.data.data;
        this.tableList = this.sendResultList;
        this.filterData = this.tableList;

        console.log(this.sendResultList);
        this.TaskFilter();
        this.paginatedData();
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
      }).catch(res => {

      });
    },
    // 셀렉트박스 필터
    TaskFilter(){
      this.taskList = [];
      for(var i in this.sendResultList){
        this.taskList.push(this.sendResultList[i].sendTaskCode);
      }
      this.taskFilter = this.taskList.filter((element, index) => this.taskList.indexOf(element) === index).sort();
      console.log('taskFilter', this.taskFilter);
      return this.taskFilter;
    },
    // 들어오는 내용에 따라 리스트값 변경
    TaskInput(e){
      this.task = e.target.value;
      console.log('TaskInput', this.task);
      if(this.task.length !== 0){
        const filterList = this.sendResultList.filter(items => items.sendTaskCode == this.task);
        console.log(filterList);
        this.tableList = filterList;
      }else {
        this.resultCall();
      }
    },
    SearchInput(e){
      this.search = e.target.value;
      console.log('SearchInput', this.search);
      if(this.search.length !== 0){
        const filterList = this.tableList.filter(items => items.scaleCode.includes(this.search));
        console.log(filterList)
        this.tableList = filterList;
      }else {
        this.task = "";
        this.search = "";
        this.resultCall();
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

.button{
  margin-top: 20px;
  margin-right: 37px;
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
.pageBtn{
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