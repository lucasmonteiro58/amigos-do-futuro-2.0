<script setup>
import { getBadgeName } from '@/utils'

const quizStore = useQuizStore()

const badgeName = computed(() => {
  return getBadgeName(quizStore.userBadge)
})

const boxText = computed(() => {
  return `Agora, me ajude a resolver alguns desafios d${badgeName.value[0]} ${badgeName.value[1]}.`
})

const audio = computed(() => {
  return `starts_desafios_${quizStore.userBadge}`
})
</script>

<template>
  <div class="flex justify-center items-center bg-primary-blue">
    <BoxComment :line="boxText" :audio="audio" :time="5000">
      <BaseButton name="btn-action-blue" width="300px" class="absolute right-[400px] top-[500px]"
        >Vamos lá</BaseButton
      >
    </BoxComment>
  </div>
</template>
