import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import mobile from '@/components/mobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/mobile',
      name: 'mobile',
      component: mobile
    }
  ]
})
