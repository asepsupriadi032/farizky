import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { 
      top: 0,
      behavior: 'smooth'
    }
  },
  routes: [
    {
      path: '/index.html',
      name: 'index',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/',
      name: 'index2',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    }
  ]
})

export default router
