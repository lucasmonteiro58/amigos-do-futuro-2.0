<script setup>
import BadgesTypeHover from './components/BadgesTypeHover.vue'
import QuizSection from './components/QuizSection.vue'

const duration = ref(null)

const quizStore = useQuizStore()
const router = useRouter()
const linesStore = useLinesStore()

const completed = computed(() => {
  return quizStore.quizCompleted
})

function updateDuration(value) {
  duration.value = value
}

function stopRobot() {
  duration.value = 1
}

onMounted(() => {
  quizStore.resetQuiz()
})

watch(completed, () => {
  if (completed.value) {
    linesStore.linesAudios.stop()
    router.push({ name: 'quiz-result', params: { id: quizStore.userBadge } })
  }
})
</script>

<template>
  <div class="flex">
    <div class="pl-5 w-2/5 bg-white">
      <BadgesTypeHover @play="updateDuration" @stop="stopRobot" />
    </div>
    <div class="w-3/5 bg-primary-blue-dark">
      <QuizSection :duration="duration" @play="updateDuration" />
    </div>
  </div>
</template>
