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
      path: '/parabens/:challenge/:level',
      name: 'congratulation',
      component: () => import('../views/congratulation/CongratulationView.vue')
    },
    {
      path: '/desafios',
      children: [
        {
          path: 'eco/1',
          name: 'eco-1',
          component: () => import('../views/challenge/eco/EcoOneView.vue'),
          meta: { challenge: 'eco', level: 1 }
        },
        {
          path: 'eco/2',
          name: 'eco-2',
          component: () => import('../views/challenge/eco/EcoTwoView.vue'),
          meta: { challenge: 'eco', level: 2 }
        },
        {
          path: 'edu/1',
          name: 'edu-1',
          component: () => import('../views/challenge/edu/EduOneView.vue'),
          meta: { challenge: 'edu', level: 1 }
        },
        {
          path: 'edu/2',
          name: 'edu-2',
          component: () => import('../views/challenge/edu/EduTwoView.vue'),
          meta: { challenge: 'edu', level: 2 }
        },
        {
          path: 'edu/3',
          name: 'edu-3',
          component: () => import('../views/challenge/edu/EduThreeView.vue'),
          meta: { challenge: 'edu', level: 3 }
        },
        {
          path: 'gov/1',
          name: 'gov-1',
          component: () => import('../views/challenge/gov/GovOneView.vue'),
          meta: { challenge: 'gov', level: 1 }
        },
        {
          path: 'gov/2',
          name: 'gov-2',
          component: () => import('../views/challenge/gov/GovTwoView.vue'),
          meta: { challenge: 'gov', level: 2 }
        },
        {
          path: 'gov/3',
          name: 'gov-3',
          component: () => import('../views/challenge/gov/GovThreeView.vue'),
          meta: { challenge: 'gov', level: 3 }
        },
        {
          path: 'gov/4',
          name: 'gov-4',
          component: () => import('../views/challenge/gov/GovFourView.vue'),
          meta: { challenge: 'gov', level: 4 }
        },
        {
          path: 'ino/1',
          name: 'ino-1',
          component: () => import('../views/challenge/ino/InoOneView.vue'),
          meta: { challenge: 'ino', level: 1 }
        },
        {
          path: 'ino/2',
          name: 'ino-2',
          component: () => import('../views/challenge/ino/InoTwoView.vue'),
          meta: { challenge: 'ino', level: 2 }
        },
        {
          path: 'ino/3',
          name: 'ino-3',
          component: () => import('../views/challenge/ino/InoThreeView.vue'),
          meta: { challenge: 'ino', level: 3 }
        },
        {
          path: 'laz/1',
          name: 'laz-1',
          component: () => import('../views/challenge/laz/LazOneView.vue'),
          meta: { challenge: 'laz', level: 1 }
        },
        {
          path: 'laz/2',
          name: 'laz-2',
          component: () => import('../views/challenge/laz/LazTwoView.vue'),
          meta: { challenge: 'laz', level: 2 }
        },
        {
          path: 'laz/3',
          name: 'laz-3',
          component: () => import('../views/challenge/laz/LazThreeView.vue'),
          meta: { challenge: 'laz', level: 3 }
        },
        {
          path: 'mei/1',
          name: 'mei-1',
          component: () => import('../views/challenge/mei/MeiOneView.vue'),
          meta: { challenge: 'mei', level: 1 }
        },
        {
          path: 'mei/2',
          name: 'mei-2',
          component: () => import('../views/challenge/mei/MeiTwoView.vue'),
          meta: { challenge: 'mei', level: 2 }
        },
        {
          path: 'mei/3',
          name: 'mei-3',
          component: () => import('../views/challenge/mei/MeiThreeView.vue'),
          meta: { challenge: 'mei', level: 3 }
        },
        {
          path: 'sau/1',
          name: 'sau-1',
          component: () => import('../views/challenge/sau/SauOneView.vue'),
          meta: { challenge: 'sau', level: 1 }
        },
        {
          path: 'sau/2',
          name: 'sau-2',
          component: () => import('../views/challenge/sau/SauTwoView.vue'),
          meta: { challenge: 'sau', level: 2 }
        }
      ]
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('../views/feedback/FeedbackView.vue')
    },
    {
      path: '/final-cutscene',
      name: 'final-cutscene',
      component: () => import('../views/final-cutscene/FinalCutsceneView.vue')
    },
    {
      path: '/certificate',
      name: 'certificate',
      component: () => import('../views/certificate/CertificateView.vue')
    }
  ]
})

export default router
