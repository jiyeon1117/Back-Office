<template>  
  <div>
    <div class="title Kor">스케쥴 설정</div>
    <div class="Box">
      <div class="box-title">스케쥴 설정</div>
      <Select class="store"></Select>
      <Select class="sector"></Select>
      <Search class="Search"></Search>
      <table>
        <tr>
          <th>저울코드</th>
          <th>서버프로그램 ID</th>
          <th>통신상태<br>전송주기</th>
          <th>일괄처리<br>저울대수</th>
          <th>통신상태확인<br>시작시각</th>
          <th>통신상태확인<br>종료시각</th>
          <th>프로그램최종<br>실행일시</th>
          <th>프로그램실행<br>시작시각</th>
          <th>프로그램실행<br>종료시각</th>
        </tr>
        <tr v-for="i in svrBatchList" :key="i.scaleSvrId">
          <td>{{i.scaleSvrId}}</td>
          <td>{{i.scalePgmId}}</td>
          <td>{{i.comnStatSendCycleVal}}</td>
          <td>{{i.allProScaleCntr}}</td>
          <td>{{i.comnStatDefStartTm}}</td>
          <td>{{i.comnStatDefEndTm}}</td>
          <td>{{i.pgmFnlExecDt}}</td>
          <td>{{i.pgmExecStartTm}}</td>
          <td>{{i.pgmExecEndTm}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Search from './piece/Search.vue'
import Select from './piece/Select.vue'
import axios from 'axios'

export default {
  name: "SvrBatchList",
  data() {
    return{
      svrBatchList : []
    }
  },
  methods: {
    batchCall(){
      axios({
        url: "http://172.16.18.116:8080/scaleSvrBatch",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        this.svrBatchList = res.data.data
      }).catch(res => {

      });
    }
  },
  created() {
    this.batchCall()
  },
  components: {
    'Search' : Search,
    'Select' : Select
  }
}
</script>

<style scoped>
table {
  margin: 10px 0px 0px 37px;
}
th {
  font-size: 14pt;
}
td {
  font-size: 13pt;
}
.Search{
  position: absolute;
  margin-top: 20px;
  margin-left: 10px;
}
</style>