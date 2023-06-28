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
      path: '/intro',
      name: 'cutscene',
      component: () => import('../views/cutscene/CutsceneView.vue')
    },
    {
      path: '/formulario',
      name: 'form',
      component: () => import('../views/form/FormView.vue')
    },
    {
      path: '/mapa',
      name: 'map',
      component: () => import('../views/map/MapView.vue')
    },
    {
      path: '/regiao',
      name: 'region',
      component: () => import('../views/region/RegionView.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/quiz/QuizView.vue')
    }
  ]
})

export default router
