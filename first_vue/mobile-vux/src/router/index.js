import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/main',
          component: resolve => require(['../components/page/main.vue'], resolve),
          meta: { title: '主页' }
        },
        {
          path: '/data',
          component: resolve => require(['../components/page/data.vue'], resolve),
          meta: { title: '实时数据' }
        },
        {
          path: '/history_data',
          component: resolve => require(['../components/page/history_data.vue'], resolve),
          meta: { title: '历史数据' }
        },
        {
          path: '/search',
          component: resolve => require(['../components/page/search.vue'], resolve),
          meta: { title: '搜索' }
        }
      ]
    },
    {
      path: '/he',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/404',
      component: resolve => require(['../components/page/404.vue'], resolve)
    },
    {
      path: '/403',
      component: resolve => require(['../components/page/403.vue'], resolve)
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    }
  ]
})
