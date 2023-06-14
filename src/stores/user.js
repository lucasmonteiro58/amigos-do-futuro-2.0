import { defineStore } from 'pinia'
import { regionsInfo } from '@/consts'

export const useUserStore = defineStore(
  'user',
  () => {
    const name = ref('')
    const gender = ref('')
    const age = ref('')
    const city = ref('')

    const allCompleted = computed(() => {
      return name.value && gender.value && age.value && city.value
    })

    const region = computed(() => {
      if (!city.value) return {}
      else return regionsInfo.find((region) => region.cities.includes(city.value))
    })

    function setGender(value) {
      gender.value = value
    }

    return { name, gender, age, city, setGender, region, allCompleted }
  },
  { persist: true }
)
