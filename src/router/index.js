import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/home')
      },
      {
        path: '/my',
        component: () => import('@/views/my')
      },
      {
        path: '/qa',
        component: () => import(/* webpackChunkName:'base' */ '@/views/qa')
      },
      {
        path: '/video',
        component: () => import(/* webpackChunkName:'base' */ '@/views/video')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login/login.vue')
  },
  {
    name: 'search',
    path: '/search',
    component: () =>
      import(/* webpackChunkName:'search' */ '@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
