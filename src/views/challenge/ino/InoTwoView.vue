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
    <!-- Central bottle/placeholder -->
    <BaseImg img="foguete_place" class="absolute top-[310px] left-[888px]" />

    <!-- Head/Bico Section -->
    <div class="absolute top-[125px] left-[770px] flex items-center gap-8">
      <button
        @click="cycleBico(-1)"
        class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center text-5xl font-bold hover:bg-gray-200 transition-colors"
      >
        ◄
      </button>
      <BaseImg :img="currentBico" class="relative" />
      <button
        @click="cycleBico(1)"
        class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center text-5xl font-bold hover:bg-gray-200 transition-colors"
      >
        ►
      </button>
    </div>

    <!-- Middle/Meio Section -->
    <div class="absolute top-[310px] left-[620px] flex items-center gap-8">
      <button
        @click="cycleMeio(-1)"
        class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center text-5xl font-bold hover:bg-gray-200 transition-colors"
      >
        ◄
      </button>
      <BaseImg :img="currentMeio" class="relative" />
      <button
        @click="cycleMeio(1)"
        class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center text-5xl font-bold hover:bg-gray-200 transition-colors"
      >
        ►
      </button>
    </div>

    <!-- Tail/Rabo Section -->
    <div class="absolute top-[620px] left-[670px] flex items-center gap-8">
      <button
        @click="cycleRabo(-1)"
        class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center text-5xl font-bold hover:bg-gray-200 transition-colors"
      >
        ◄
      </button>
      <BaseImg :img="currentRabo" class="relative" />
      <button
        @click="cycleRabo(1)"
        class="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center text-5xl font-bold hover:bg-gray-200 transition-colors"
      >
        ►
      </button>
    </div>

    <!-- Launch Button -->
    <div class="absolute bottom-[130px] right-[180px]">
      <button
        @click="launchRocket"
        class="bg-gradient-to-b from-blue-400 to-blue-600 text-white font-bold text-3xl px-12 py-6 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all transform hover:scale-105"
      >
        LANÇAR<br />FOGUETE
      </button>
    </div>

    <!-- Click hint -->
    <CursorClick v-if="showHint" class="absolute top-[350px] left-[950px]" />

    <!-- Info button with popover -->
    <div class="absolute top-[125px] right-[160px]">
      <Popper placement="bottom-start" offsetDistance="40" locked hover>
        <template #content>
          <div class="w-[400px] rounded-md">
            <div class="text-3xl font-bold pb-2 bg-gray-200 px-4 py-2">Saiba Mais</div>
            <div class="text-2xl px-4 py-2">
              Em 2018, mais de dez mil alunos cearenses participaram da mostra brasileira de
              foguetes.
            </div>
          </div>
        </template>
        <BaseButton name="btn-toggle-info" width="90px"></BaseButton>
      </Popper>
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
