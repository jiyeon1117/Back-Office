<template>
  <body>
    <router-view></router-view>
  </body>
</template>

<script>
import Scale from './Scale.vue'
import Server from './Server.vue'
import Setting from './Setting.vue'
import Send from './Send.vue'
import Schadule from './Schedule'

export default {
  components: {
    'Scale' : Scale,
    'Server' : Server,
    'Setting' : Setting,
    'Send' : Send,
    'Schadule' :Schadule
  }
}
</script>

<style scoped>
body {
  display: inline;
  position: absolute;
  float: left;
  width: calc(100% - 250px);
  height: calc(100% - 80px);
  background-color: #F3F9FF;
}
</style>