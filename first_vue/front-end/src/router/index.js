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
          path: '/dashboard',
          component: resolve => require(['../components/page/dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/amap',
          component: resolve => require(['../components/page/Amap.vue'], resolve),
          meta: { title: '地图' }
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
          path: '/chart',
          component: resolve => require(['../components/page/chart.vue'], resolve),
          meta: { title: '数据曲线' }
        },
        {
          path: '/table',
          component: resolve => require(['../components/page/BaseTable.vue'], resolve),
          meta: { title: '基础表格' }
        },
        {
          path: '/tabs',
          component: resolve => require(['../components/page/Tabs.vue'], resolve),
          meta: { title: 'tab选项卡' }
        },
        {
          path: '/form',
          component: resolve => require(['../components/page/BaseForm.vue'], resolve),
          meta: { title: '基本表单' }
        },
        {
          // 富文本编辑器组件
          path: '/editor',
          component: resolve => require(['../components/page/VueEditor.vue'], resolve),
          meta: { title: '富文本编辑器' }
        },
        {
          // markdown组件
          path: '/markdown',
          component: resolve => require(['../components/page/Markdown.vue'], resolve),
          meta: { title: 'markdown编辑器' }
        },
        {
          // 图片上传组件
          path: '/upload',
          component: resolve => require(['../components/page/Upload.vue'], resolve),
          meta: { title: '文件上传' }
        },
        {
          // vue-schart组件
          path: '/charts',
          component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
          meta: { title: 'schart图表' }
        },
        {
          // 拖拽列表组件
          path: '/drag',
          component: resolve => require(['../components/page/DragList.vue'], resolve),
          meta: { title: '拖拽列表' }
        },
        {
          // 权限页面
          path: '/permission',
          component: resolve => require(['../components/page/Permission.vue'], resolve),
          meta: { title: '权限测试', permission: true }
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
