<template>
  <Header>
    <div class="Header">
      <button @click="hiddenMenu()"><img class="menu" :src="require(`@/assets/menu.png`)"/></button>
      <router-link to='/User'><button><img class="user" :src="require(`@/assets/user.png`)"/></button></router-link>
    </div>
  </Header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      counts : 0
    }
  },
  computed :{
    ...mapState(['menuBar'])
  },
  methods: {
    hiddenMenu() {
      console.log('menuBar', this.menuBar);
      this.$store.commit("SET_MENU", false);
      // var menu = [];
      // menu.cnt = counts;
      // menu.bar = this.menuBar;
      // console.log('menu', menu);

      // if(menu.cnt % 2 == 0){
      //   this.menuBar = false;
      //   console.log('클릭 menuBar', menu.bar);
      //   this.$store.commit("SET_MENU", menu);
      // } else if(menu.cnt % 2 == 1){
      //   console.log('땡땡!');
      // }
      // var menu = []
      // if(this.menuButton == true){
      //   console.log('변경 전 menuButton', menu.button, 'menuBar', menu.bar)
      //   menu.button = true;
      //   menu.bar = false;
      //   console.log('변경 후 menuButton', menu.button, 'menuBar', menu.bar)
      //   this.$store.commit("SET_MENU", menu);
      // }

    }
  }
}
</script>

<style scoped>
.Header {
  margin: 0;
  background-color: #003366;
  display: flex;
  justify-content: space-between;
  height: 60px;
}
button{
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
}
.menu {
  display: block;
  width: 25px;
  margin: auto 0px auto 30px;
}
.user {
  display: block;
  margin: 25% 30px 25% 0px;
  width: 24px;
}
</style>