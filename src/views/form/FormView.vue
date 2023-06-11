<script setup>
import { robotOrange, formQuestions } from '@/consts'
import FormSections from './components/FormSections.vue'

const index = ref(0)

const currentQuestion = computed(() => {
  return formQuestions[index.value]
})

function nextQuestion() {
  if (index.value < 3) {
    index.value++
    linesStore.playAudio(currentQuestion.value.audio)
  }
}

function prevQuestion() {
  index.value--
  linesStore.playAudio(currentQuestion.value.audio)
}
const linesStore = useLinesStore()

onMounted(() => {
  linesStore.playAudio(currentQuestion.value.audio)
})
</script>

<template>
  <div class="flex">
    <div class="pl-5 w-2/5 bg-white flex flex-col item-center mt-2">
      <RobotAnimate
        v-motion-slide-left
        :key="index"
        :animation="robotOrange"
        :time="currentQuestion.duration"
        class="mb-6 flex justify-center"
        width="650px"
      >
      </RobotAnimate>

      <div class="flex justify-center gap-x-10 mr-9">
        <BaseButton
          name="btn-toggle-arrow-p"
          :disabled="index === 0"
          width="110px"
          @click="prevQuestion"
        ></BaseButton>
        <BaseButton
          name="btn-toggle-arrow"
          width="110px"
          @click="nextQuestion"
          :disabled="index === 3"
        ></BaseButton>
      </div>
    </div>
    <div class="w-3/5 bg-primary-blue-dark">
      <FormSections
        :index="index"
        v-motion-slide-left
        :key="index"
        @gender="nextQuestion"
        @next="nextQuestion"
      ></FormSections>
    </div>
  </div>
</template>
