<template class="back">
  <div class="black-bg">
    <div class="white-bg">
      <div class="box-title">Login</div>

      <input type="text" v-model="form.email" class="id" placeholder="Email">
      <input type="text" v-model="form.userPwd" placeholder="PASSWORD">

      <button class="login" @click="submit()">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  computed :{
      ...mapState(['login'])
  },
  data(){
    return {
      user : [],
      form: {
        email: "",
        userPwd: "",
      }
    }
  },
  methods: {
    submit(){
      console.log('email', this.form.email)
      console.log('pwd', this.form.userPwd);
      this.userPost();
      this.clearData();
    },
    userPost(){
      axios.post('http://172.16.18.116:8080/user/login', this.form)
        .then((res) => {
          if(res.status == 200){ 
            console.log(res);
            this.$router.push('/Scale');
            this.$store.commit("SET_LOGIN", this.login);
          }
        })
        .catch((err) => {
          console.log(err)
          alert('아이디/비밀번호가 틀렸습니다. 다시 입력해주세요.');
        });
    },
    clearData(){
      this.form.email = "";
      this.form.userPwd = "";
    }
  },
}
</script>

<style scoped>
.black-bg{
  width: 100%;
  height: 100%;
  
  background-color: #F3F9FF;
  /* background-color: transparent; */
}

.box-title{
  margin: 50px 0px 0px 0px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
  font-size: 34px;
}

.white-bg{
  text-align: center;
  justify-content: center;
  border-radius: 10px;
  width: 460px;
  height: 410px;
}

/* .Kor {
  margin-top: 25px;
  margin-left: 30px;
  font-size: 20px;
  font-weight: 300;
} */

input{
  width: 330px;
  height: 43px;
  border: 1.5px solid #003366;
  border-radius: 10px;
  color: #334554;
  font-size: 20px;
  outline: none;
  padding-left: 12px;
}
.id{
  margin-top: 32px;
  margin-bottom: 15px;
}
.login {
  width: 345px;
  height: 58px;
  margin-top: 35px;
  background-color: #003366;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 900;
}
</style>