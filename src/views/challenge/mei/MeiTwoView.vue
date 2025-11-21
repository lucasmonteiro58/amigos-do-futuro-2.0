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
const handleVegetableDrop = ({ dataTransfer }) => {
  const vegetable = vegetables.value.find((v) => v.id === dataTransfer)

  if (vegetable && !vegetable.inSink) {
    effectsStore.playAudio('feedback_botao_01')
    vegetable.inSink = true
    vegetable.top = vegetable.sinkTop
    if (vegetable.sinkLeft) {
      vegetable.left = vegetable.sinkLeft
    }
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
        class="absolute cursor-pointer"
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
      v-if="showPipesAnimation"
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
      <!-- <BaseImg img="sustent_cestavazia" class="absolute" style="top: 24%; left: 12%; width: 15%" /> -->
      <BaseImg
        img="sustent_cestavazia3"
        class="absolute z-30"
        style="top: 33.5%; left: 12%; width: 15%"
      />

      <!-- Drop Zone -->
      <DropElement
        :expected="vegetables.map((v) => v.id)"
        @dropped="handleVegetableDrop"
        class="absolute"
        style="top: 35%; left: 34%; width: 28%; height: 20%; z-index: 10"
      />

      <DragElement
        v-for="vegetable in vegetables"
        :key="vegetable.id"
        :dataTransfer="vegetable.id"
        :style="{
          top: vegetable.top,
          left: vegetable.left,
          width: vegetable.width + ' !important',
          zIndex: vegetable.inSink ? 1 : 20
        }"
        :class="vegetable.inSink ? 'pointer-events-none' : ''"
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
      style="bottom: 162px; left: -18px"
      @animationOver="handleFaucetAnimationOver"
    />

    <!-- Overlay for Kitchen (Darken top part) -->
    <div
      v-if="showOverlay"
      class="absolute top-0 left-0 w-full bg-black opacity-60 pointer-events-none"
      style="height: 48.5%"
    ></div>

    <SpeechBubble
      title="XIII...SEM ÁGUA!"
      description="Essa casa não tem <a>saneamento básico</a>. Ligue os canos para chegar água na torneira!"
      tooltip="Sistema de canos por onde a água chega na nossa casa e por onde sai."
      audio="mei_help2"
      :time="6000"
    />
  </main>
</template>
