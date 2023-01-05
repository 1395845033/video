import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: '/index',
    component: () => import('../pages/index.vue'),
  },
  {
    path: '/searchDetail',
    component: () => import('../pages/searchDetail.vue'),
  },
  {
    path: '/videoPlay',
    component: () => import('../pages/videoPlay.vue'),
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
