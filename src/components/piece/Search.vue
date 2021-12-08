<template>
  <input type="text" name="search" id="search" placeholder="Search">
</template>

<script>
export default {
  
}
</script>

<style scoped>
#search{
  width: 192px;
  height: 34px;
  margin-right: 37px;
  margin-bottom: 10px;
  border: 2px solid #E1E7EE;
  border-radius: 10px;
  background-color: #F5F8FA;

  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 17px;
  outline: none;
  padding-left: 8px;
}

input::placeholder {
  color: #557EA7;
}

</style>