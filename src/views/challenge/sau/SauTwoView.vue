<script setup>
import { seesaw, toboggan, smartphone, ball, rocking } from '@/consts/_animations'

const effectsStore = useEffectsStore()

const isTobogganCompleted = ref(false)

const isCompleted = ref(false)
const showHint = ref(true)

const escorregador = ref(false)
const campinho = ref(false)
const balanco = ref(false)
const gangorra = ref(false)
const tablet = ref(false)

const bilotoPercentage = ref(49.4)
const targetPercentage = 66.6
const barStartPercentage = 32.2
const barEndPercentage = 68.2

const refTobogganAnimation = ref(null)
const refBallAnimation = ref(null)
const refRockingAnimation = ref(null)
const refSeesawAnimation = ref(null)
const refSmartphoneAnimation = ref(null)

const showModal = ref(false)

function closeModal() {
  showModal.value = false
}

const energyIncrements = {
  escorregador: 4.8,
  campinho: 5.8,
  balanco: 2.8,
  gangorra: 3.8,
  tablet: 0
}

const showTobogganAnimation = ref(false)
const showBallAnimation = ref(false)
const showRockingAnimation = ref(false)
const showSeesawAnimation = ref(false)
const showSmartphoneAnimation = ref(false)

const isPlaying = computed(() => {
  return (
    showTobogganAnimation.value ||
    showBallAnimation.value ||
    showRockingAnimation.value ||
    showSeesawAnimation.value ||
    showSmartphoneAnimation.value
  )
})

const showCampinhoWithBall = ref(true)

function updateEnergy(element) {
  if (isPlaying.value) return

  if (element === 'escorregador' && escorregador.value) return
  if (element === 'campinho' && campinho.value) return
  if (element === 'balanco' && balanco.value) return
  if (element === 'gangorra' && gangorra.value) return
  if (element === 'tablet' && tablet.value) return

  showHint.value = false

  const increment = energyIncrements[element]
  bilotoPercentage.value += increment

  bilotoPercentage.value = Math.max(
    barStartPercentage,
    Math.min(barEndPercentage, bilotoPercentage.value)
  )

  if (element === 'escorregador') {
    escorregador.value = true
    showTobogganAnimation.value = true
  } else if (element === 'campinho') {
    campinho.value = true
    showCampinhoWithBall.value = false
    showBallAnimation.value = true
  } else if (element === 'balanco') {
    balanco.value = true
    showRockingAnimation.value = true
  } else if (element === 'gangorra') {
    gangorra.value = true
    showSeesawAnimation.value = true
  } else if (element === 'tablet') {
    tablet.value = true
    showSmartphoneAnimation.value = true
  }

  effectsStore.playAudio('feedback_botao_01')
}

const { complete } = useComplete()

function handleNext() {
  if (Math.abs(bilotoPercentage.value - targetPercentage) < 0.1) {
    isCompleted.value = true

    complete()
  } else {
    showModal.value = true
  }
}
</script>

<template>
  <main
    class="flex relative flex-col justify-center items-center w-full h-full spritesheet bg_parquinho_saude"
  >
    <BaseImg
      img="parquinho_escorrega"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="isTobogganCompleted ? 'opacity-50' : 'opacity-100'"
      style="top: 26%; left: 5%; width: 21%"
      @click="updateEnergy('escorregador')"
    />

    <BaseAnimation
      v-if="showTobogganAnimation"
      ref="refTobogganAnimation"
      :spritesheet="toboggan.sprite"
      :json="toboggan.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="
        () => {
          isTobogganCompleted = true
          showTobogganAnimation = false
        }
      "
      width="30%"
      class="absolute"
      style="bottom: -1.4%; right: 28.1%"
    />

    <BaseImg
      v-if="!showBallAnimation && showCampinhoWithBall"
      img="parquinho_campinho"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="campinho ? 'opacity-50' : 'opacity-100'"
      style="top: 32%; left: 32%; width: 37%"
      @click="updateEnergy('campinho')"
    />

    <BaseImg
      v-if="showBallAnimation"
      img="campo-sem-bola"
      class="absolute transition-opacity duration-300 cursor-pointer"
      style="top: 31.5%; left: 31.4%; width: 38%"
    />

    <BaseAnimation
      v-if="showBallAnimation"
      ref="refBallAnimation"
      :spritesheet="ball.sprite"
      :json="ball.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="
        () => {
          showBallAnimation = false
          showCampinhoWithBall = true
        }
      "
      width="30%"
      class="absolute"
      style="bottom: 11%; left: 3%"
    />

    <BaseImg
      v-if="!showRockingAnimation"
      img="parquinho_balanco"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="balanco ? 'opacity-50' : 'opacity-100'"
      style="left: 74%; top: 29%"
      @click="updateEnergy('balanco')"
    />

    <BaseAnimation
      v-if="showRockingAnimation"
      ref="refRockingAnimation"
      :spritesheet="rocking.sprite"
      :json="rocking.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showRockingAnimation = false"
      width="43%"
      class="absolute"
      style="bottom: 1.8%; left: 33.9%"
    />

    <BaseImg
      v-if="!showSeesawAnimation"
      img="parquinho_gangorra"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="gangorra ? 'opacity-50' : 'opacity-100'"
      style="left: 39%; top: 67%"
      @click="updateEnergy('gangorra')"
    />

    <BaseAnimation
      v-if="showSeesawAnimation"
      ref="refSeesawAnimation"
      :spritesheet="seesaw.sprite"
      :json="seesaw.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showSeesawAnimation = false"
      width="45%"
      class="absolute"
      style="bottom: -12%; left: -0.1%"
    />

    <BaseImg
      v-if="!showSmartphoneAnimation"
      img="parquinho_tablet"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="tablet ? 'opacity-50' : 'opacity-100'"
      style="left: 70%; top: 72%"
      @click="updateEnergy('tablet')"
    />

    <BaseImg
      v-if="showSmartphoneAnimation"
      img="parquinho_table1t"
      class="absolute transition-opacity duration-300 cursor-pointer"
      style="left: 70%; top: 72%"
      @click="updateEnergy('tablet')"
    />

    <BaseAnimation
      v-if="showSmartphoneAnimation"
      ref="refSmartphoneAnimation"
      :spritesheet="smartphone.sprite"
      :json="smartphone.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showSmartphoneAnimation = false"
      width="43%"
      class="absolute"
      style="bottom: -21%; left: 17.3%"
    />

    <BaseImg
      img="parquinho_barrasaude"
      class="absolute"
      style="top: 90%; left: 32.2%; width: 36%"
    />

    <BaseImg
      img="parquinho_marcadorbarra_saude"
      class="absolute transition-all duration-[1300ms] ease-out"
      :style="{ top: '89.3%', left: `${bilotoPercentage}%`, width: '1.5%' }"
    />

    <BaseImg
      img="parquinho_cxa_muitaenergia"
      class="absolute"
      style="top: 90%; left: 69%; width: 12.2%"
    />
    <BaseImg
      img="parquinho_cxa_poucaenergia"
      class="absolute"
      style="top: 90%; right: 69%; width: 12.2%"
    />

    <CursorClick v-if="showHint" class="absolute top-[400px] left-[700px] opacity-70" />

    <ModalAtention v-model="showModal" @close="closeModal" content-font="font-exo2">
      <div class="mt-8">Ainda tem energia sobrando. Brinque mais!</div>
    </ModalAtention>

    <BaseButton
      name="btn-action-white"
      class="absolute bottom-[54px] right-[44px]"
      width="240px"
      @click="handleNext"
    >
      <span class="text-primary-blue-text">Próximo</span>
    </BaseButton>

    <SpeechBubble
      title="Vamos brincar!"
      description="Brincar também te deixa muito saudável. Aproveite os brinquedos."
      audio="sau_help1"
      :time="7000"
    />
  </main>
</template>
