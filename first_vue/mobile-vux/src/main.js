// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import axios from 'axios'
import store from './store/store'
import axiosapi from './public/axiosapi'
import api from '../../back-end/api'

import { Loading, Table, TableColumn } from 'element-ui'

import { XButton, Group } from 'vux'

Vue.use(Loading)
Vue.use(Table)
Vue.use(TableColumn)

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.component('x-button', XButton)
Vue.component('group', Group)

Vue.prototype.$http = axios
Vue.prototype.api = api
Vue.prototype.axiosapi = axiosapi

router.beforeEach((to, from, next) => {
  // console.log(to.path)
  if (to.path === '/login') {
    next()
  } else {
    let islogin = false
    try {
      if (router.app.$store.state.user.role) {
        islogin = true
      }
    } catch (e) {}
    if (islogin) {
    // console.log(router.app.$store.state.user.role)
      if (router.app.$store.state.user.role > 10) {
        // console.log('2')
        next()
      } else {
        console.log('4')
        next('/login')
      }
    } else {
      console.log('3')
      // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
      next('/login')
    }
  }
})
/* eslint-disable no-new */
/*
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
*/
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
