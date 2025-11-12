<script setup>
import CursorClick from '@/components/animations/CursorClick.vue'
import { elementsFour } from './consts'
import BaseButton from '@/components/inputs/BaseButton.vue'
const index = ref(0)

const currentQuestion = computed(() => elementsFour[index.value])

const punctuation = ref(0)

const router = useRouter()

function handleChoose(option) {
  if (currentQuestion.value.isCorrect === option) {
    punctuation.value += 1
  }

  index.value += 1

  if (index.value >= elementsFour.length) {
    router.push({ name: 'congratulation', params: { challenge: 'gov', level: 4 } })
  }
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenarioprefeitura_governo">
    <SpeechBubble
      title="Lei é Lei!"
      description="Ajude o prefeito a decidir o que é bom para a sua cidade."
      audio="gov_help3"
      :time="5000"
    />
    <CursorClick class="absolute bottom-[250px] left-[700px]" />
    <div class="absolute top-[350px] flex flex-col gap-3">
      <h1 class="text-[#244C45] font-bungee text-4xl text-center">{{ currentQuestion.title }}</h1>
      <p class="text-[#244C45] text-3xl w-[450px] text-center font-[600]">
        {{ currentQuestion.description }}
      </p>
      <div class="flex justify-center gap-16 mt-10">
        <BaseButton
          name="btn-op-yes"
          width="150px"
          className="hue-rotate-[10.1rad]"
          @click="handleChoose(true)"
        />
        <BaseButton
          name="btn-op-no"
          width="150px"
          className="hue-rotate-[10.1rad]"
          @click="handleChoose(false)"
        />
      </div>
    </div>
  </main>
</template>
