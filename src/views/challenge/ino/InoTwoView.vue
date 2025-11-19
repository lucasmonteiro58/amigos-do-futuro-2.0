<script setup>
import Popper from 'vue3-popper'
const router = useRouter()
const effectsStore = useEffectsStore()

const bicoIndex = ref(0) // Head/nose cone index (0-3)
const meioIndex = ref(0) // Middle/body index (0-3)
const raboIndex = ref(0) // Tail/fins index (0-3)
const showHint = ref(true)
const isCompleted = ref(false)

// Sprite arrays for each section
const bicoSprites = ['bicogarrafa', 'bico1', 'bico2', 'bico3']
const meioSprites = ['foguete_meiogarrafa', 'foguete_meio1', 'foguete_meio2', 'foguete_meio3']
const raboSprites = ['foguete_rabogarrafa', 'foguete_rabo1', 'foguete_rabo2', 'foguete_rabo3']

// Computed properties for current sprites
const currentBico = computed(() => bicoSprites[bicoIndex.value])
const currentMeio = computed(() => meioSprites[meioIndex.value])
const currentRabo = computed(() => raboSprites[raboIndex.value])

// Cycle through options with wrap-around
function cycleBico(direction) {
  showHint.value = false
  effectsStore.playAudio('feedback_botao_01')

  if (direction > 0) {
    bicoIndex.value = bicoIndex.value === 3 ? 0 : bicoIndex.value + 1
  } else {
    bicoIndex.value = bicoIndex.value === 0 ? 3 : bicoIndex.value - 1
  }
}

function cycleMeio(direction) {
  showHint.value = false
  effectsStore.playAudio('feedback_botao_01')

  if (direction > 0) {
    meioIndex.value = meioIndex.value === 3 ? 0 : meioIndex.value + 1
  } else {
    meioIndex.value = meioIndex.value === 0 ? 3 : meioIndex.value - 1
  }
}

function cycleRabo(direction) {
  showHint.value = false
  effectsStore.playAudio('feedback_botao_01')

  if (direction > 0) {
    raboIndex.value = raboIndex.value === 3 ? 0 : raboIndex.value + 1
  } else {
    raboIndex.value = raboIndex.value === 0 ? 3 : raboIndex.value - 1
  }
}

function launchRocket() {
  if (isCompleted.value) return

  isCompleted.value = true
  showHint.value = false
  effectsStore.playAudio('feedback_botao_01')

  setTimeout(() => {
    router.push({
      name: 'congratulation',
      params: { challenge: 'ino', level: 2 }
    })
  }, 2000)
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenario_inovacao2">
    <!-- Rocket Assembly Container -->
    <div class="absolute top-[180px] left-1/2 -translate-x-1/2 flex flex-col items-center">
      <!-- Head/Bico Section -->
      <div class="flex items-center gap-4 z-20">
        <BaseButton
          name="btn-toggle-arrow"
          width="80px"
          class="transform rotate-180"
          @click="cycleBico(-1)"
        />
        <div class="w-[500px] h-[145px] flex justify-center items-end">
          <BaseImg :img="currentBico" />
        </div>
        <BaseButton name="btn-toggle-arrow" width="80px" @click="cycleBico(1)" />
      </div>

      <!-- Middle/Meio Section -->
      <div class="flex items-center gap-4 z-10">
        <BaseButton
          name="btn-toggle-arrow"
          width="80px"
          class="transform rotate-180"
          @click="cycleMeio(-1)"
        />
        <div class="w-[500px] h-[175px] flex justify-center items-center relative">
          <BaseImg :img="currentMeio" class="z-10" />
        </div>
        <BaseButton name="btn-toggle-arrow" width="80px" @click="cycleMeio(1)" />
      </div>

      <!-- Tail/Rabo Section -->
      <div class="flex items-center gap-4">
        <BaseButton
          name="btn-toggle-arrow"
          width="80px"
          class="transform rotate-180"
          @click="cycleRabo(-1)"
        />
        <div class="w-[500px] h-[130px] flex justify-center items-start">
          <BaseImg :img="currentRabo" />
        </div>
        <BaseButton name="btn-toggle-arrow" width="80px" @click="cycleRabo(1)" />
      </div>
    </div>

    <!-- Click hint -->
    <CursorClick v-if="showHint" class="absolute top-[350px] left-[1050px]" />

    <!-- Info button with popover -->
    <div class="absolute bottom-[180px] right-[50px]">
      <Popper placement="top-end" offsetDistance="20" locked hover>
        <template #content>
          <div class="w-[400px] rounded-md mb-4">
            <div class="text-4xl font-bold pb-2 bg-gray-200 px-4 py-2">Saiba Mais</div>
            <div class="text-3xl px-4 py-2 bg-white">
              Em 2018, mais de dez mil alunos cearenses participaram da mostra brasileira de
              foguetes.
            </div>
          </div>
        </template>
        <BaseButton name="btn-toggle-info" width="90px"></BaseButton>
      </Popper>
    </div>

    <!-- Launch Button -->
    <div class="absolute bottom-[50px] right-[50px]">
      <div
        class="relative cursor-pointer hover:scale-105 transition-transform"
        @click="launchRocket"
      >
        <BaseImg img="btn-action-white" width="300px" />
        <div class="absolute inset-0 flex flex-col items-center justify-center leading-none">
          <span class="text-primary-blue-text font-black text-4xl uppercase">LANÇAR</span>
          <span class="text-primary-blue-text font-black text-4xl uppercase">FOGUETE</span>
        </div>
      </div>
    </div>

    <!-- Speech bubble -->
    <SpeechBubble
      title="Indo para o espaço!"
      description="Monte um foguete que consiga ir até o espaço."
      audio="ino_help1"
      :time="6000"
    />
  </main>
</template>
