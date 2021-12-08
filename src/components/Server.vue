<template>
  <div>
    <div class="title Eng">Server</div>
    <div class="Box">
      <div class="box-title">서버 통신 상태</div>
      <Search class="search"></Search>
      <table>
        <tr>
          <th>서버</th>
          <th>IP</th>
          <th>동작여부</th>
        </tr>
        <tr v-for="i in 10" :key="i">
          <td>서버</td>
          <td>IP</td>
          <td>동작여부</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Search from './piece/Search.vue'

export default {
  components: {
    'Search' : Search
  }
}
</script>

<style scoped>
table {
  margin: 15px 0px 0px 37px;
}
.search{
  margin-top: -10px;
  float: right;
}

</style>