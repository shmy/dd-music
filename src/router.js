import Vue from 'vue'
import VueRouter from 'vue-router'
import { check } from '@/plugins/update'

Vue.use(VueRouter)
/* global System */
const load = name => () => System.import(`@/pages/${name}.vue`)
const interval = 3600 // 一小时检查一次
const checkUpdate = () => {
  const lastchecktime = window.localStorage.getItem('lastchecktime') || 0
  if (Math.floor(Date.now() / 1000) - lastchecktime <= interval) return
  check(1)
}
const beforeEnter = (to, from, next) => {
  next()
  checkUpdate()
}
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: load('index'),
      children: [
        { path: '', component: load('children/recommend') },
        { path: '/singer', component: load('children/singer') },
        { path: '/rank', component: load('children/rank') },
        { path: '/search', component: load('children/search') },
        { path: '/me', component: load('children/me') }
      ]
    }
  ]
})

router.beforeEach(beforeEnter)

export default router
