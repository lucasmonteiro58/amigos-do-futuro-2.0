import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/HomeView.vue')
    },
    {
      path: '/formulario',
      name: 'formulario',
      component: () => import('../views/form/FormView.vue')
    },
    {
      path: '/mapa',
      name: 'mapa',
      component: () => import('../views/map/MapView.vue')
    }
  ]
})

export default router
