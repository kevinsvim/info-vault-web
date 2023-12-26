import { createRouter, createWebHistory } from 'vue-router'
import { start, close } from "@/utils/nprogress";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index',
      component: () => import('@/views/layout/DefaultLayout.vue'),
      children: [
        {
          path: '/index',
          name: 'home',
          component: () => import('@/views/home/VaultHomePage.vue'),
          meta: {
            title: '首页',
            keepAlive: true,
            requireAuth: true,
            breadcrumb: [],
            affix: true,
            activeMenu: '/home',
            icon: 'icon-home',
            order: 1,
            hidden: false,
          }
        }
      ]
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
