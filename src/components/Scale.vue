<template>
  <div>
    <div class="title Eng">Scale</div>
    <div class="Box">
      <div class="box-title">저울 통신 상태</div>
      <Select class="store"></Select>
      <Select class="sector"></Select>
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
        <tr v-for="i in 9" :key="i">
          <td>매장</td>
          <td>부문</td>
          <td>저울 코드</td>
          <td>IP</td>
          <td>모델명</td>
          <td>저울 버전</td>
          <td>전송 결과</td>
          <td>연결 상태</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Search from './piece/Search.vue'
import Select from './piece/Select.vue'

export default {
  components: {
    'Search' : Search,
    'Select' : Select
  }
}
</script>

<style scoped>
.Search{
  margin-top: 20px;
  float: right;
}
</style>