<script setup>
import { rocket } from '@/consts/_animations'
import Popper from 'vue3-popper'
const router = useRouter()
const effectsStore = useEffectsStore()

const bicoIndex = ref(0)
const meioIndex = ref(0)
const raboIndex = ref(0)
const showHint = ref(true)
const isCompleted = ref(false)

const bicoSprites = ['bicogarrafa', 'bico1', 'bico2', 'bico3']
const meioSprites = ['foguete_meiogarrafa', 'foguete_meio1', 'foguete_meio2', 'foguete_meio3']
const raboSprites = ['foguete_rabogarrafa', 'foguete_rabo1', 'foguete_rabo2', 'foguete_rabo3']

const rocketConfig = {
  bico: [
    { top: '121px', left: '823px', width: '292px' },
    { top: '108px', left: '847px', width: '246px' },
    { top: '189px', left: '854px', width: '230px' },
    { top: '221px', left: '850px', width: '240px' }
  ],
  meio: [
    { top: '311px', left: '824px', width: '288px' },
    { top: '247px', left: '778px', width: '384px' },
    { top: '292px', left: '781px', width: '374px' },
    { top: '308px', left: '726px', width: '488px' }
  ],
  rabo: [
    { top: '651px', left: '826px', width: '288px' },
    { top: '645px', left: '778px', width: '384px' },
    { top: '648px', left: '753px', width: '442px' },
    { top: '643px', left: '778px', width: '384px' }
  ]
}

const currentBico = computed(() => bicoSprites[bicoIndex.value])
const currentMeio = computed(() => meioSprites[meioIndex.value])
const currentRabo = computed(() => raboSprites[raboIndex.value])

const currentBicoStyle = computed(() => rocketConfig.bico[bicoIndex.value])
const currentMeioStyle = computed(() => rocketConfig.meio[meioIndex.value])
const currentRaboStyle = computed(() => rocketConfig.rabo[raboIndex.value])

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
}

function goToCongratulation() {
  router.push({
    name: 'congratulation',
    params: { challenge: 'ino', level: 2 }
  })
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenario_inovacao2">
    <BaseImg :img="currentBico" class="absolute z-20" :style="currentBicoStyle" />
    <BaseImg :img="currentMeio" class="absolute z-10" :style="currentMeioStyle" />
    <BaseImg :img="currentRabo" class="absolute z-0" :style="currentRaboStyle" />

    <BaseButton
      name="btn-toggle-arrow"
      width="110px"
      class="absolute top-[270px] left-[538px] transform rotate-180"
      @click="cycleBico(-1)"
    />
    <BaseButton
      name="btn-toggle-arrow"
      width="110px"
      class="absolute top-[270px] right-[538px]"
      @click="cycleBico(1)"
    />

    <BaseButton
      name="btn-toggle-arrow"
      width="110px"
      class="absolute top-[486px] left-[538px] transform rotate-180"
      @click="cycleMeio(-1)"
    />
    <BaseButton
      name="btn-toggle-arrow"
      width="110px"
      class="absolute top-[486px] right-[538px]"
      @click="cycleMeio(1)"
    />

    <BaseButton
      name="btn-toggle-arrow"
      width="110px"
      class="absolute top-[702px] left-[538px] transform rotate-180"
      @click="cycleRabo(-1)"
    />
    <BaseButton
      name="btn-toggle-arrow"
      width="110px"
      class="absolute top-[702px] right-[538px]"
      @click="cycleRabo(1)"
    />

    <div class="absolute bottom-[237px] right-[48px]">
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

    <div class="absolute bottom-[54px] right-[44px]">
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

    <CursorClick v-if="showHint" class="absolute top-[325px] left-[1350px]" />

    <SpeechBubble
      title="Indo para o espaço!"
      description="Monte um foguete que consiga ir até o espaço."
      audio="ino_help1"
      :time="6000"
    />

    <BaseAnimation
      v-if="isCompleted"
      :spritesheet="rocket.sprite"
      :json="rocket.json"
      autoplay
      fps="36"
      :isLoop="false"
      @animationOver="goToCongratulation"
      class="absolute z-20"
    />
  </main>
</template>
