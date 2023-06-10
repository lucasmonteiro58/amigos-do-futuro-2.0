import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const gender = ref('')
  const age = ref('')
  const city = ref('')

  function setGender(value) {
    gender.value = value
  }

  return { name, gender, age, city, setGender }
})
