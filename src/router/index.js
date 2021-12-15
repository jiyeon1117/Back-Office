import Vue from 'vue'
import Router from 'vue-router'
import Scale from '@/components/Scale'
import Server from '@/components/Server'
import Setting from '@/components/Setting'
import Send from '@/components/Send'
import Schedule from '@/components/Schedule'
import ScaleModal from '@/components/ScaleModal'
import ScheduleModal from '@/components/ScheduleModal'
import User from '@/components/user'
import VueRouter from 'vue-router'

const origin = VueRouter.prototype.push;
VueRouter.prototype.push =  function push(location) {
  return origin.call(this, location).catch(() => {
    return window.location.reload()
  })
}

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
      path: '/ScaleModal',
      name: 'ScaleModal',
      component: ScaleModal
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
    {
      path: '/ScheduleModal',
      name: 'ScheduleModal',
      component: ScheduleModal
    },
    {
      path: '/User',
      name: 'User',
      component: User
    }
  ]
})
