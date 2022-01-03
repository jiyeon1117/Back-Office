<template>
  <body :class="menuBar ? true : 'bodyMenu'">
    <router-view></router-view>
  </body>
</template>

<script>
import Scale from './Scale.vue'
import Server from './Server.vue'
import Setting from './Setting.vue'
import Send from './Send.vue'
import Schadule from './Schedule'
import { mapState } from 'vuex'

export default {
  computed :{
    ...mapState(['menuBar'])
  },
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
  width: calc(100% - 230px);
  height: calc(100% - 60px);
  background-color: #F3F9FF;
  overflow: auto;
}
.bodyMenu{
  width: calc(100% - 85px);
}
</style>