<script setup>
import { robotOrange, formQuestions } from '@/consts'
import FormSections from './components/FormSections.vue'

const index = ref(0)
const linesStore = useLinesStore()
const userStore = useUserStore()
const robotRef = ref(null)
const router = useRouter()

const currentQuestion = computed(() => {
  return formQuestions[index.value]
})

function goToRegion() {
  if (userStore.allCompleted) {
    router.push({ name: 'region' })
  } else {
    showModal.value = true
  }
}

function nextQuestion() {
  if (index.value < 3) {
    if (shouldShowModal()) {
      showModal.value = true
      return
    }
    index.value++
    linesStore.playAudio(currentQuestion.value.audio)
  }
}

function prevQuestion() {
  index.value--
  linesStore.playAudio(currentQuestion.value.audio)
}

const showModal = ref(false)
function closeModal() {
  showModal.value = false
}

function shouldShowModal() {
  switch (index.value) {
    case 0:
      return !userStore.gender
    case 1:
      return !userStore.name
    case 2:
      return !userStore.age
    case 3:
      return !userStore.city
    default:
      return false
  }
}

onMounted(() => {
  linesStore.playAudio(currentQuestion.value.audio)
})
</script>

<template>
  <div class="flex">
    <div class="pl-5 w-2/5 bg-white flex flex-col item-center mt-2">
      <RobotAnimate
        :id="currentQuestion.id"
        ref="robotRef"
        :animation="robotOrange"
        :time="currentQuestion.duration"
        class="mb-6 flex justify-center animation__zoomIn"
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
        :key="index"
        @gender="nextQuestion"
        @next="nextQuestion"
        @finish="goToRegion"
        class="animation__slideLeft"
      ></FormSections>
    </div>
    <ModalAtention v-model="showModal" @close="closeModal">
      <div>
        <div class="text-[3rem] mb-5">Epa!</div>
        <div>Responda a pergunta primeiro!</div>
      </div>
    </ModalAtention>
  </div>
</template>
