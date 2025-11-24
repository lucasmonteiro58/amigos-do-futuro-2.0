import { defineStore } from 'pinia'

export const useProgressStore = defineStore(
  'progress',
  () => {
    const challenges = ref([
      {
        name: 'eco',
        completed: false,
        level: 1
      },
      {
        name: 'edu',
        completed: false,
        level: 1
      },
      {
        name: 'gov',
        completed: false,
        level: 1
      },
      {
        name: 'ino',
        completed: false,
        level: 1
      },
      {
        name: 'laz',
        completed: false,
        level: 1
      },
      {
        name: 'mei',
        completed: false,
        level: 1
      },
      {
        name: 'sau',
        completed: false,
        level: 1
      }
    ])

    const completeChallenge = (challenge) => {
      challenges.value.find((c) => c.name === challenge).completed = true
    }

    const getChallenge = (challenge) => {
      return challenges.value.find((c) => c.name === challenge)
    }

    const getCurrentLevel = (challenge) => {
      return challenges.value.find((c) => c.name === challenge).level
    }

    const setCurrentLevel = (challenge, level) => {
      challenges.value.find((c) => c.name === challenge).level = level
    }

    return {
      challenges,
      completeChallenge,
      getChallenge,
      getCurrentLevel,
      setCurrentLevel
    }
  },
  { persist: true }
)
