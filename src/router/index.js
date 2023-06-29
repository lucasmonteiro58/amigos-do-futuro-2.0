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
      path: '/regiao',
      name: 'region',
      component: () => import('../views/region/RegionView.vue')
    },
    {
      path: '/mapa',
      name: 'map',
      component: () => import('../views/map/MapView.vue')
    },

    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('../views/quiz/QuizView.vue')
    },
    {
      path: '/quiz/:id',
      name: 'quiz-result',
      component: () => import('../views/quiz-result/QuizResultView.vue')
    },
    {
      path: '/comecar-desafios',
      name: 'start-challenges',
      component: () => import('../views/start-challenges/StartChallengesView.vue')
    }
  ]
})

export default router
