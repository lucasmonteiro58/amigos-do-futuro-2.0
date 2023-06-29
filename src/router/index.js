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
    },
    {
      path: '/desafios',
      children: [
        {
          path: 'eco/1',
          name: 'eco-1',
          component: () => import('../views/challenge/eco/EcoOneView.vue')
        },
        {
          path: 'eco/2',
          name: 'eco-2',
          component: () => import('../views/challenge/eco/EcoTwoView.vue')
        },
        {
          path: 'edu/1',
          name: 'edu-1',
          component: () => import('../views/challenge/edu/EduOneView.vue')
        },
        {
          path: 'edu/2',
          name: 'edu-2',
          component: () => import('../views/challenge/edu/EduTwoView.vue')
        },
        {
          path: 'edu/3',
          name: 'edu-3',
          component: () => import('../views/challenge/edu/EduThreeView.vue')
        },
        {
          path: 'gov/1',
          name: 'gov-1',
          component: () => import('../views/challenge/gov/GovOneView.vue')
        },
        {
          path: 'gov/2',
          name: 'gov-2',
          component: () => import('../views/challenge/gov/GovTwoView.vue')
        },
        {
          path: 'gov/3',
          name: 'gov-3',
          component: () => import('../views/challenge/gov/GovThreeView.vue')
        },
        {
          path: 'gov/4',
          name: 'gov-4',
          component: () => import('../views/challenge/gov/GovFourView.vue')
        },
        {
          path: 'ino/1',
          name: 'ino-1',
          component: () => import('../views/challenge/ino/InoOneView.vue')
        },
        {
          path: 'ino/2',
          name: 'ino-2',
          component: () => import('../views/challenge/ino/InoTwoView.vue')
        },
        {
          path: 'ino/3',
          name: 'ino-3',
          component: () => import('../views/challenge/ino/InoThreeView.vue')
        },
        {
          path: 'laz/1',
          name: 'laz-1',
          component: () => import('../views/challenge/laz/LazOneView.vue')
        },
        {
          path: 'laz/2',
          name: 'laz-2',
          component: () => import('../views/challenge/laz/LazTwoView.vue')
        },
        {
          path: 'laz/3',
          name: 'laz-3',
          component: () => import('../views/challenge/laz/LazThreeView.vue')
        },
        {
          path: 'mei/1',
          name: 'mei-1',
          component: () => import('../views/challenge/mei/MeiOneView.vue')
        },
        {
          path: 'mei/2',
          name: 'mei-2',
          component: () => import('../views/challenge/mei/MeiTwoView.vue')
        },
        {
          path: 'mei/3',
          name: 'mei-3',
          component: () => import('../views/challenge/mei/MeiThreeView.vue')
        },
        {
          path: 'sau/1',
          name: 'sau-1',
          component: () => import('../views/challenge/sau/SauOneView.vue')
        },
        {
          path: 'sau/2',
          name: 'sau-2',
          component: () => import('../views/challenge/sau/SauTwoView.vue')
        }
      ]
    }
  ]
})

export default router
