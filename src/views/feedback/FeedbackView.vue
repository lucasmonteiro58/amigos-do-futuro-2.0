<script setup>
import BaseButton from '@/components/inputs/BaseButton.vue'
import BaseImg from '@/components/media/BaseImg.vue'
import { robotOrange } from '@/consts'

const feedbackText = ref('')

const robotRef = ref(null)
const answer = ref('')
const router = useRouter()

function sendFeedback() {
  console.log('Feedback enviado:', feedbackText.value)
  router.push({ name: 'final-cutscene' })
}

const linesStore = useLinesStore()

function playAudio() {
  linesStore.playAudio('feedback_fala1')
}

function handleStart() {
  robotRef.value.playAgain()
  playAudio()
}

onMounted(() => {
  playAudio()
})
</script>

<template>
  <main class="w-full h-full flex font-exo2">
    <div class="w-[40%] h-full bg-white flex flex-col items-center justify-center relative">
      <div class="relative flex flex-col items-center mt-8">
        <RobotAnimate
          ref="robotRef"
          :animation="robotOrange"
          :time="3000"
          class="mb-6 flex justify-center animation__zoomIn"
          width="420px"
        >
        </RobotAnimate>

        <BaseImg img="box-robot-comment-down" class="w-[380px] relative top-[-100px]">
          <div
            class="absolute top-0 left-0 w-full h-full flex items-center justify-center px-8 pt-20"
          >
            <p class="text-center font-bold text-5xl text-primary-blue-dark">
              Você gostou de ajudar o Ceará comigo?
            </p>
          </div>
          <BaseButton
            name="btn-toggle-repeat"
            width="80px"
            class="absolute bottom-6 right-10"
            @click="handleStart"
          />
        </BaseImg>
      </div>

      <div class="flex gap-6 mt-2 ml-10 relative top-[-80px]">
        <button
          @click="answer = 'yes'"
          class="rounded-3xl border-primary-blue-text border-[6px] text-primary-blue-text px-8 py-4 font-bungee text-5xl"
          :class="{ 'bg-primary-blue-text text-white': answer === 'yes' }"
        >
          Sim
        </button>
        <button
          @click="answer = 'no'"
          class="rounded-3xl border-primary-blue-text border-[6px] text-primary-blue-text px-8 py-4 font-bungee text-5xl"
          :class="{ 'bg-primary-blue-text text-white': answer === 'no' }"
        >
          Não
        </button>
      </div>
    </div>

    <!-- Right Side (Blue)-->
    <div class="w-[60%] h-full bg-[#305676] flex flex-col items-center justify-center relative">
      <h1
        class="text-white font-black text-6xl mb-10 font-bungee uppercase tracking-wider text-center"
      >
        QUER CONTAR ALGO?
      </h1>

      <BaseImg img="textarea-box" class="w-[550px] relative">
        <textarea
          v-model="feedbackText"
          placeholder="Pode escrever aqui"
          class="absolute top-0 left-0 w-full h-full bg-transparent border-none outline-none p-10 text-5xl text-gray-500 font-exo2 resize-none placeholder-gray-400 leading-normal text-center"
          style="padding-top: 3rem; padding-left: 3rem; padding-right: 3rem"
        ></textarea>
      </BaseImg>

      <div class="mt-20">
        <BaseButton name="btn-action-orange" width="280px" label="ENVIAR" @click="sendFeedback" />
      </div>
    </div>
  </main>
</template>
