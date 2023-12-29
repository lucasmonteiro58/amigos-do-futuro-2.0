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
  <div class="flex justify-center items-center bg-congrats spritesheet">
    <BoxCongrats :line="boxText" :audio="audio" :time="5000" bg-congrats>
      <BaseImg img="eco-badge" width="600px" class="absolute top-12 right-[300px]"></BaseImg>
      <div>
        <BaseImg img="star-full" width="130px" class="absolute top-[610px] left-[950px]"></BaseImg>
        <BaseImg img="star-full" width="130px" class="absolute top-[650px] left-[1100px]"></BaseImg>
        <BaseImg img="star-full" width="130px" class="absolute top-[610px] left-[1250px]"></BaseImg>
      </div>
      <BaseButton
        name="btn-toggle-next"
        width="160px"
        class="absolute right-[-40px] top-[350px]"
        @click="quizStore.playAudio('starts_desafios')"
      ></BaseButton>
    </BoxCongrats>
  </div>
</template>
