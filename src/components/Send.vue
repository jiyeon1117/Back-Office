<template>
  <div>
    <div class="title Kor">재전송 명령</div>
    <div class="Box">
      <div class="box-title">재전송 명령</div>
      <Select class="store"></Select>
      <Select class="sector"></Select>
      <Search class="Search"></Search>
      <Select class="task"></Select>
      <div class="btn">
        <button>Recent</button>
      </div>
      <table>
        <tr>
          <th>저울코드</th>
          <th>전송업무코드</th>
          <th>전송여부</th>
          <th>최종전송일시</th>
        </tr>
        <tr v-for="i in 9" :key="i">
          <td>저울코드</td>
          <td>전송업무코드</td>
          <td>전송여부</td>
          <td>최종전송일시</td>
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
  position: absolute;
  margin-top: 20px;
  margin-left: 10px;
}

.task{
  float: right;
  margin: 20px 138px 0px 0px;
}

button {
  margin-top: -37px;
  margin-right: 37px;
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