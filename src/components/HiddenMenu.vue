<template>
  <div class="side-menu">
    <div class="icon">
      <button><router-link to="/Scale"><img :src="require(`@/assets/scale.png`)"/></router-link></button>
      <button><router-link to="/Server"><img :src="require(`@/assets/server.png`)"/></router-link></button>
      <button><router-link to="/Send"><img :src="require(`@/assets/send.png`)"/></router-link></button>
      <button><router-link to="/Schedule"><img :src="require(`@/assets/schedule.png`)"/></router-link></button>
      <button><router-link to="/Setting"><img :src="require(`@/assets/setting.png`)"/></router-link></button>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
  }
}
</script>

<style scoped>
.side-menu {
  float: left;
  margin: 0;
  width: 80px;
  height: calc(100vh - 60px);
}
.icon{
  margin-top: 30px;
  margin-left: 18px;
}
button{
  background-color: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  margin-bottom: 40px;
}

img{
  width: 32px;
}
</style>