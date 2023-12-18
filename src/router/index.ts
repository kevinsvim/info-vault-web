import { createRouter, createWebHistory } from 'vue-router'
import { start, close } from "@/utils/nprogress";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_API),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage/VaultHomePage.vue'),
      meta: {
        title: '首页',
        keepAlive: true,
        requireAuth: false,
        isHide: false,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  start()
  next()
})

router.afterEach((to, from) => {
  close()
})
export default router
