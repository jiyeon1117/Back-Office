<template>
  <Header>
    <div class="Header">
      <button><img class="menu" :src="require(`@/assets/menu.png`)"/></button>
      <button><img class="user" :src="require(`@/assets/user.png`)"/></button>
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
  margin: auto 30px auto 0px;
  width: 24px;
}
</style>