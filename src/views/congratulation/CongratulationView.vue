<script setup>
import { congratulations } from '@/consts'

const quizStore = useQuizStore()

const route = useRoute()

const challenge = computed(() => {
  return route.params.challenge
})

const level = computed(() => {
  return route.params.level
})

const boxText = computed(() => {
  return congratulations[`${challenge.value}_${level.value - 1}`]?.text
})

const audio = computed(() => {
  return `${challenge.value}_parabens${level.value}`
})

const imageBadge = computed(() => {
  return challenge.value + '-badge'
})

const getStars = computed(() => {
  return congratulations[`${challenge.value}_${level.value - 1}`]?.stars
})
</script>

<template>
  <div class="flex justify-center items-center bg-congrats spritesheet">
    <BoxCongrats :line="boxText" :audio="audio" :time="5000" bg-congrats>
      <BaseImg :img="imageBadge" width="600px" class="absolute top-12 right-[300px]"></BaseImg>
      <div>
        <BaseImg
          :img="getStars[0]"
          width="130px"
          class="absolute top-[610px] left-[950px]"
        ></BaseImg>
        <BaseImg
          :img="getStars[1]"
          width="130px"
          class="absolute top-[650px] left-[1100px]"
        ></BaseImg>
        <BaseImg
          :img="getStars[2]"
          width="130px"
          class="absolute top-[610px] left-[1250px]"
        ></BaseImg>
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
