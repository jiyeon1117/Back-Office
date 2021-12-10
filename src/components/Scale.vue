<template>
  <div>
    <div class="title Eng">Scale</div>
    <div class="Box">
      <div class="box-title">저울 통신 상태</div>
      <select class="store" id="select">
        <option value="value" v-for="i in scaleList" :key="i.scaleCode">{{i.strCode}}</option>
      </select>
      <select class="sector" id="select">
        <option value="value" v-for="i in scaleList" :key="i.scaleSectorCode">{{i.scaleSectorCode}}</option>
      </select>
      <Search class="Search"></Search>
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
import Search from './piece/Search.vue'
import Select from './piece/Select.vue'
import axios from 'axios'

export default {
  name: "ScaleList",
  data(){
    return{
      scaleList : []
    }
  },
  methods: {
    scaleCall() {
      axios({
        url: "http://172.16.18.116:8080/scale",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        this.scaleList = res.data.data
      }).catch(res => {

      });
    }
  },
  created() {
    this.scaleCall()
  },
  components: {
    'Search' : Search,
    'Select' : Select
  }
}
</script>

<style scoped>
.Search{
  margin-right: 37px;
  margin-top: 20px;
  float: right;
}

</style>