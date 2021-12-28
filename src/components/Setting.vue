<template>
  <div>
    <div class="title Eng">Setting</div>
    <div class="Box">
      <div class="box-title">DB 연결 정보</div>
      <button @click="saveData()">Edit</button>
      <div class="group">
        <div class="text">기본 작업 DB IP</div>
        <input type="text" v-model="ip" class="input ip" placeholder="ip">
      </div>
      <div class="group">
        <div class="text after">기본 작업 DB PORT</div>
        <input type="text" v-model="port" class="input port" placeholder="port">
      </div>
      <div class="group">
        <div class="text after">기본 작업 DB 접속 명령</div>
        <input type="text" v-model="command" class="input command" placeholder="command">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "SettingList",
  data(){
    return{
      settingList : [],
      list : [],
      ip : "",
      port : "",
      command : ""
    }
  },
  methods: {
    settingCall() {
      axios({
        url: "http://172.16.18.116:8080/scaleSvr",
        method: "GET"
      }).then(res => {
        console.log(res.data.data)
        this.settingList = res.data.data;
        this.ip = localStorage.getItem('ip');
        this.port = localStorage.getItem('port');
        this.command = localStorage.getItem('command');
      }).catch(res => {

      });
    },
    saveData(){
      localStorage.ip = this.ip;
      localStorage.port = this.port;
      localStorage.command = this.command;
      console.log(this.ip, this.port, this.command)
      alert('DB 정보가 저장되었습니다.')
    }
  },
  created() {
    this.settingCall()
  },
}
</script>

<style scoped>
.Box{
  height: 360px;
}
button {
  cursor: pointer;
  margin-top: -40px;
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
.group {
  display: block;  
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 300;
}
.text {
  display: inline-block;
  margin-top: 40px;
  margin-left: 37px;
  font-size: 24px;
}
.after {
  margin-top: 30px;
}
.input{
  margin-left: 88px;
  width: 300px;
  height: 40px;
  border: 1.5px solid #003366;
  border-radius: 10px;
  color: #334554;
  font-size: 20px;
  outline: none;
  padding-left: 12px;
}
.ip{
  margin-left: 160px;
}
.port {
  margin-left: 120px;
}
.command {
  width: 680px;
}

</style>