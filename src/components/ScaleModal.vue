<template>
  <div class="black-bg" >
    <div class="white-bg">
      <button @click="hiddenModal()"><img :src="imgSrc" class="img"></button>
      <div class="box-title">전송 결과</div>
      <input type="text" name="search" id="search" placeholder="Search (StrCode)" v-model="search" @input="SearchInput" @keydown.tab="KeydownTab">
      <table>
        <tr>
          <th>저울 코드</th>
          <th>전송 업무</th>
          <th>전송 여부</th>
          <th>최종 전송 일시</th>
        </tr>
        <tr v-for="(i, index) in sendResultList" :key="index">
          <td>{{i.scaleCode}}</td>
          <td>{{i.sendTaskCode != null ? task[parseInt(i.sendTaskCode)-1] : 'X'}}</td>
          <td>{{i.sendYn == '1' ? '성공': '실패'}}</td>
          <td>{{i.fnlSendDt}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: "SendResultList",
  computed :{
    ...mapState(['scaleModal','scaleCode'])
  },
  data(){
    return {
      imgSrc : require('../assets/close.png'),
      sendResultList : [],
      search: "",
      task: ['저울 상품', '도축장', '용도', '판매종료', '위해 개체', '생산 등록', '가격 변경', '단축키 전송']
    }
  },
  methods: {
    ResultListCall() {
      axios({
        url: "http://172.16.18.116:8080/scaleSendResult?size=0",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        this.sendResultList = res.data.data
      }).catch(res => {
      });
    },
    hiddenModal(){
      this.$store.commit("SET_SCALE_MODAL", false);
    },
    SearchInput(e){
      this.search = e.target.value;
      if(this.search.length !== 0){
        clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
          const filterList = this.sendResultList.filter(items => items.scaleCode.includes(this.search));
          console.log(filterList)
          this.sendResultList = filterList;
        }, 100);
      }else {
        clearTimeout(this.debounce);
        this.debounce = setTimeout(()=> {
          this.ResultListCall()
        });
      }
    }

  },
  created() {
    this.ResultListCall()
    // alert(this.smodalNum)
  }
}
</script>

<style scoped>
#search{
  float: right;
  margin-top: -10px;
  margin-right: 30px;
}
.box-title{
  margin-left: 30px;
  font-size: 26px;
}

.white-bg{
  width: 660px;
  border-radius: 10px;
  padding: 0px 0px 32px 0px;
}

.img{
  width: 20px;
}

button{
  background-color: transparent;
  float: right;
  width: 30px;
  height: 25px;
  margin-right: 10px;
  border: none;
  cursor: pointer;
}

.Box {
  position: absolute;
  padding: 0px 0px 40px 0px;
  margin: 30px 0px 0px 45px;
  width: 100%;
  height: 100%;
  background-color: white;
  border: 1px solid #DDDDDD;
  border-radius: 10px;
  box-shadow: 0px 0px 4px 0px rgba(61, 36, 36, 0.2);
}

table {
  display: inline-block;
  margin: 10px 0px 0px 30px;
  padding: 0 0px 0 0;
  width: 92%;
  height: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  border-style: hidden;
  box-shadow: none;
  border-radius: 10px;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}
th{
  max-height: 47px;
  padding: 11px;
  color: white;
  font-size: 15pt;
  font-weight: 500;
  border: 10px soild white;
  background-color: #003366;
}
tr{
  border-radius: 10px;
  border: 1px solid #E1E7EE;
}
td{
  max-height: 46px;
  padding: 11px;
  font-size: 14pt;
  color: #374554;
  font-weight: 500;
}
</style>