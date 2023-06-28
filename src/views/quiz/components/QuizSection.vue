<script setup>
import { quizQuestions, robotOrange } from '@/consts'

defineProps({
  duration: {
    type: Number,
    default: null
  }
})

const emits = defineEmits(['play'])

const index = ref(0)
const showModal = ref(false)
const quizStore = useQuizStore()
const linesStore = useLinesStore()

const currentQuestion = computed(() => {
  return quizQuestions[index.value]
})

const yesSelected = computed(() => {
  return quizStore.quiz[currentQuestion.value.name] === 'yes' ? 'brightness-125' : ''
})

const noSelected = computed(() => {
  return quizStore.quiz[currentQuestion.value.name] === 'no' ? 'brightness-125' : ''
})

function nextQuestion() {
  if (index.value < quizQuestions.length - 1) {
    if (shouldShowModal()) {
      showModal.value = true
      return
    }
    index.value++
    emits('play', currentQuestion.value.duration)
    linesStore.playAudio(currentQuestion.value.audio)
  }
}

function prevSection() {
  if (index.value > 0) {
    index.value--
    emits('play', currentQuestion.value.duration)
    linesStore.playAudio(currentQuestion.value.audio)
  }
}

function closeModal() {
  showModal.value = false
}

function shouldShowModal() {
  return currentQuestion.value.name && !quizStore.quiz[currentQuestion.value.name]
}

function setQuizAnswer(answer) {
  quizStore.setQuiz(currentQuestion.value.name, answer)
  nextQuestion()
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="flex mt-[60px] items-center gap-x-8">
      <BaseButton
        name="btn-toggle-arrow-p"
        width="120px"
        class="mt-20"
        @click="prevSection"
        :disabled="index === 0"
      ></BaseButton>
      <RobotAnimate
        :id="currentQuestion.name"
        :key="duration"
        ref="robotRef"
        :animation="robotOrange"
        :time="duration || currentQuestion.duration"
        class="mb-6 flex justify-center animation__zoomIn"
        width="430px"
      >
      </RobotAnimate>
      <BaseButton
        name="btn-toggle-arrow"
        width="120px"
        class="mt-20 -ml-8"
        @click="nextQuestion"
        :disabled="index === quizQuestions.length - 1"
      ></BaseButton>
    </div>
    <BaseImg img="quiz_robot-balloon" class="mt-8">
      <div
        class="text-primary-blue-dark pt-[80px] px-[50px] font-bungee text-[2.5rem] leading-[2.7rem] font-bold text-center"
      >
        <span :key="index" class="animation__bounceIn">{{ currentQuestion.title }}</span>
      </div>
    </BaseImg>
    <div class="flex gap-10 mt-8">
      <BaseButton
        :class="yesSelected"
        name="btn-action-orange"
        width="270px"
        @click="setQuizAnswer('yes')"
        >Sim</BaseButton
      >
      <BaseButton
        :class="noSelected"
        name="btn-action-orange"
        width="270px"
        @click="setQuizAnswer('no')"
        >Não</BaseButton
      >
    </div>
    <ModalAtention v-model="showModal" @close="closeModal">
      <div>
        <div class="text-[3rem] mb-5">Epa!</div>
        <div>Responda a pergunta primeiro!</div>
      </div>
    </ModalAtention>
  </div>
</template>
