import Vue from 'vue'
import Router from 'vue-router'
import Scale from '@/components/Scale'
import Server from '@/components/Server'
import Setting from '@/components/Setting'
import Send from '@/components/Send'
import Schedule from '@/components/Schedule'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Scale',
      component: Scale
    },
    {
      path: '/Scale',
      name: 'Scale',
      component: Scale
    },
    {
      path: '/Server',
      name: 'Server',
      component: Server
    },
    {
      path: '/Setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/Send',
      name: 'Send',
      component: Send
    },
    {
      path: '/Schedule',
      name: 'Schedule',
      component: Schedule
    },
  ]
})
