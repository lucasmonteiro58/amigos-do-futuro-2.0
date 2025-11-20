<script setup>
import { ref } from 'vue'
import { useEffectsStore } from '@/stores/effects'
import { useRouter } from 'vue-router'
import { pipes as pipesAnimation, faucet as faucetAnimation } from '@/consts/_animations'
import { pipesData, correctRotations, vegetablesData } from '@/views/challenge/mei/consts'

const effectsStore = useEffectsStore()
const router = useRouter()

// Phase control
const currentPhase = ref('pipes') // 'pipes', 'vegetables', 'faucet', 'complete'
const showPipes = ref(true)
const showPipesAnimation = ref(false)
const showVegetables = ref(false)
const showFaucetAnimation = ref(false)
const showOverlay = ref(true)

const refPipesAnimation = ref(null)
const refFaucetAnimation = ref(null)

// Pipes data
const pipes = ref(JSON.parse(JSON.stringify(pipesData)))

// Vegetables data
const vegetables = ref(
  vegetablesData.map((v) => ({
    ...v,
    top: v.initialTop,
    left: v.initialLeft,
    inSink: false
  }))
)
const vegetablesInSink = ref(0)

// Pipes phase
const handlePipeClick = (index) => {
  if (currentPhase.value !== 'pipes') return

  effectsStore.playAudio('feedback_sustentabilidade_canos')

  const pipe = pipes.value[index]
  pipe.rotation = (pipe.rotation + 90) % 360

  checkPipesCompletion()
}

const checkPipesCompletion = () => {
  const allCorrect = pipes.value.every((pipe) => {
    return pipe.rotation === correctRotations[pipe.id]
  })

  if (allCorrect) {
    currentPhase.value = 'pipesAnimation'
    showPipes.value = false
    showPipesAnimation.value = true
    showOverlay.value = false

    setTimeout(() => {
      if (refPipesAnimation.value) {
        refPipesAnimation.value.play()
      }
    }, 100)
  }
}

const handlePipesAnimationOver = () => {
  currentPhase.value = 'vegetables'
  showPipesAnimation.value = false
  showVegetables.value = true
}

// Vegetables phase
const handleVegetableDragEnd = (index, event) => {
  const vegetable = vegetables.value[index]

  if (vegetable.inSink) return

  // Check if dropped in sink area (approximate drop zone)
  const dropZone = {
    top: 35,
    left: 34,
    right: 62,
    bottom: 55
  }

  const rect = event.target.getBoundingClientRect()
  const parentRect = event.target.offsetParent.getBoundingClientRect()

  const percentTop = ((rect.top - parentRect.top) / parentRect.height) * 100
  const percentLeft = ((rect.left - parentRect.left) / parentRect.width) * 100

  if (
    percentTop >= dropZone.top &&
    percentTop <= dropZone.bottom &&
    percentLeft >= dropZone.left &&
    percentLeft <= dropZone.right
  ) {
    effectsStore.playAudio('feedback_botao_01')
    vegetable.inSink = true
    vegetable.top = vegetable.sinkTop
    vegetablesInSink.value++

    if (vegetablesInSink.value === 6) {
      setTimeout(() => {
        startFaucetAnimation()
      }, 300)
    }
  }
}

const startFaucetAnimation = () => {
  currentPhase.value = 'faucet'
  showFaucetAnimation.value = true

  effectsStore.playAudio('feedback_sustentabilidade_aguapia')

  setTimeout(() => {
    if (refFaucetAnimation.value) {
      refFaucetAnimation.value.play()
    }
  }, 100)
}

const handleFaucetAnimationOver = () => {
  currentPhase.value = 'complete'

  setTimeout(() => {
    router.push({
      name: 'congratulation',
      params: { challenge: 'mei', level: 2 }
    })
  }, 500)
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-center spritesheet bg-cozinha relative w-full h-full"
  >
    <BaseImg img="sustent_torneira" class="absolute" style="top: 22.5%; left: 45%; width: 8.6%" />
    <BaseImg img="sustent_pia" class="absolute" style="top: 45.76%; left: 30%; width: 34%" />

    <!-- Pipes Phase -->
    <div v-if="showPipes">
      <BaseImg
        v-for="(pipe, index) in pipes"
        :key="pipe.id"
        :img="pipe.sprite"
        class="absolute cursor-pointer transition-transform duration-300"
        :style="{
          top: pipe.top,
          left: pipe.left,
          width: pipe.width + ' !important',
          transform: `rotate(${pipe.rotation}deg)`
        }"
        @click="handlePipeClick(index)"
      />
    </div>

    <!-- Pipes Animation -->
    <BaseAnimation
      v-show="showAnimation"
      ref="refPipesAnimation"
      :spritesheet="pipesAnimation.sprite"
      :json="pipesAnimation.json"
      :fps="8"
      :isLoop="false"
      width="824px"
      class="absolute origin-top-left"
      style="bottom: -28.9%; right: 2.25%"
      @animationOver="handlePipesAnimationOver"
    />

    <!-- Vegetables Phase -->
    <div v-if="showVegetables">
      <!-- Basket -->
      <BaseImg img="sustent_cestavazia" class="absolute" style="top: 24%; left: 12%; width: 15%" />
      <BaseImg
        img="sustent_cestavazia3"
        class="absolute"
        style="top: 33.5%; left: 12%; width: 15%"
      />

      <!-- Draggable Vegetables -->
      <DragElement
        v-for="(vegetable, index) in vegetables"
        :key="vegetable.id"
        :dataTransfer="vegetable.id"
        :style="{
          top: vegetable.top,
          left: vegetable.left,
          width: vegetable.width + ' !important'
        }"
        :class="vegetable.inSink ? 'pointer-events-none' : ''"
        @end-drag="(e) => handleVegetableDragEnd(index, e)"
      >
        <BaseImg :img="vegetable.sprite" />
      </DragElement>
    </div>

    <!-- Faucet Animation -->
    <BaseAnimation
      v-if="showFaucetAnimation"
      ref="refFaucetAnimation"
      :spritesheet="faucetAnimation.sprite"
      :json="faucetAnimation.json"
      :fps="8"
      :autoplay="false"
      :isLoop="false"
      width="28%"
      class="absolute origin-top-left"
      style="bottom: 27%; left: 46.65%; transform: scale(1.16)"
      @animationOver="handleFaucetAnimationOver"
    />

    <!-- Overlay for Kitchen (Darken top part) -->
    <div
      v-if="showOverlay"
      class="absolute top-0 left-0 w-full bg-black opacity-60 pointer-events-none"
      style="height: 48.5%"
    ></div>

    <SpeechBubble
      v-if="currentPhase === 'pipes'"
      title="XIII...SEM ÁGUA!"
      description="Essa casa não tem <a>saneamento básico</a>. Ligue os canos para chegar água na torneira!"
      tooltip="Sistema de canos por onde a água chega na nossa casa e por onde sai."
      audio="mei_help2"
      :time="6000"
    />
  </main>
</template>
