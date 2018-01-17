import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/zh-CN/component/intro',
      component: resolve => require(['./docs/intro.md'], resolve)
    },
    {
      path: '/zh-CN/component/quickstart',
      component: resolve => require(['./docs/quickstart.md'], resolve)
    },
    {
      path: '/zh-CN/component/changelog',
      component: resolve => require(['./docs/changelog.md'], resolve)
    },
    {
      path: '/zh-CN/component/loading',
      component: resolve => require(['./docs/loading.md'], resolve)
    }
  ]
})

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  ...App
})
