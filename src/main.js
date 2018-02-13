import '@/assets/reset.styl'
import '@/assets/style.css'
import '@/assets/iconfont.css'
import Vue from 'vue'
import App from './App'
import {
  Cell,
  CellGroup,
  NavBar,
  SwitchCell,
  Search,
  Button,
  Swipe,
  SwipeItem,
  Panel,
  Lazyload
} from 'vant'

import Toast from '@/plugins/toast'
import Dialog from '@/plugins/dialog'
import router from './router'
import store from './store'
import hub from '@/plugins/audio'
import Db from '@/plugins/lowdb'
// import * as SQL from 'sql.js'
// console.log(SQL)
Vue.config.productionTip = false
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(NavBar)
Vue.use(SwitchCell)
Vue.use(Search)
Vue.use(Button)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Panel)

Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Lazyload)

Vue.use(hub)

Vue.mixin({
  methods: {
    playSync (data) {
      // console.log('准备添加进历史记录')
      Db.History.create(data.id)
      this.$store.commit('SET_SONG', data)
      this.$hub.emit('play', data.url)
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
