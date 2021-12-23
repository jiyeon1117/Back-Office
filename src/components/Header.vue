<template>
  <Header>
    <div class="Header">
      <button @click="hiddenMenu()"><img class="menu" :src="require(`@/assets/menu.png`)"/></button>
      <button><img class="user" :src="require(`@/assets/user.png`)"/></button>
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
      var menu = [];
      menu.bar = this.menuBar;

      if(menu.bar == true) menu.bar = false;
      else menu.bar = true;
      
      this.$store.commit("SET_MENU", menu);
      console.log('menuBar', menu);
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