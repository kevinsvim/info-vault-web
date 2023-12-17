import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage/ProgramHomePage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_API),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        title: '首页',
        keepAlive: true,
        requireAuth: false,
        isHide: false,
      }
    },
  ]
})

export default router
