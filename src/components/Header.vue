<template>
  <Header>
    <div class="Header">
      <img class="menu" :src="require(`@/assets/menu.png`)"/>
      <img class="user" :src="require(`@/assets/user.png`)"/>
    </div>
  </Header>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.Header {
  margin: 0;
  background-color: white;
  color: white;

  display: flex;
  justify-content: space-between;
  height: 80px;
}
.menu {
  display: block;
  width: 30px;
  margin: auto 0px auto 30px;
}
.user {
  display: block;
  margin: auto 30px auto 0px;
  width: 30px;
  height: 30px;
}
</style>