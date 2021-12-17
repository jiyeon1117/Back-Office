<template>
  <div>
    <div class="title Kor">재전송 명령</div>
    <div class="Box">
      <div class="box-title">재전송 명령</div>
      <input type="text" name="search" id="search" placeholder="저울코드 검색" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <div class="btn">
        <button>Recent</button>
      </div>
      <select name="select" id="select" class="task">
        <!-- <option v-for="(i, index) in filterMenu" :key="index">{{i}}</option> -->
        <option>{{filterMenu}}</option>
      </select>
      <table>
        <tr>
          <th>저울코드</th>
          <th>전송업무코드</th>
          <th>전송여부</th>
          <th>최종전송일시</th>
        </tr>
        <tr v-for="i in sendResultList" :key="i.scaleCode">
          <td>{{i.scaleCode}}</td>
          <td>{{i.sendTaskCode != null ? filterMenu = task[parseInt(i.sendTaskCode)-1] : 'X'}}</td>
          <td>{{i.sendYn == '1' ? '성공': '실패'}}</td>
          <td>{{i.fnlSendDt}}</td>
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
      task: ['저울 상품', '도축장', '용도', '판매종료', '위해 개체', '생산 등록', '가격 변경', '단축키 전송']
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
        });
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
  }
}
</script>

<style scoped>
#select{
  width: 120px;
}
#search{  
  position: absolute;
  margin-top: 20px;
  margin-left: 37px;
}
.task{
  float: right;
  margin-right: 10px;
  margin-top: 24px;
}

button {
  margin-top: 24px;
  margin-right: 37px;
  margin-bottom: 8px;
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