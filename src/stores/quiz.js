import { defineStore } from 'pinia'
import { quizQuestions } from '@/consts'

export const useQuizStore = defineStore(
  'quiz',
  () => {
    const quiz = ref({
      mei: null,
      laz: null,
      ino: null,
      edu: null,
      eco: null,
      sau: null,
      gov: null
    })

    const quizCompleted = computed(() => {
      return (
        Object.values(quiz.value).filter((value) => value !== null).length === quizQuestions.length
      )
    })

    const calculatePontuation = computed(() => {
      const pontuation = { mei: 0, laz: 0, ino: 0, edu: 0, eco: 0, sau: 0, gov: 0 }
      quizQuestions.forEach((question) => {
        const answer = quiz.value[question.name]

        if (answer === 'yes') {
          Object.keys(question.matriz).forEach((key) => {
            pontuation[key] += question.matriz[key]
          })
        }
      })
      return pontuation
    })

    const userBadge = computed(() => {
      const pontuation = calculatePontuation.value
      const max = Math.max(...Object.values(pontuation))
      const badge = Object.keys(pontuation).find((key) => pontuation[key] === max)
      return badge
    })

    function setQuiz(name, value) {
      quiz.value[name] = value
    }

    function resetQuiz() {
      quiz.value = {
        mei: null,
        laz: null,
        ino: null,
        edu: null,
        eco: null,
        sau: null,
        gov: null
      }
    }

    return {
      quiz,
      setQuiz,
      calculatePontuation,
      userBadge,
      quizCompleted,
      resetQuiz
    }
  },
  { persist: true }
)
