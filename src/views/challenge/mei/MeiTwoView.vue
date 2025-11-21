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
    }, 50)
  }
}

const handlePipesAnimationOver = () => {
  currentPhase.value = 'vegetables'
  showVegetables.value = true
}

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
  }, 50)
}

const handleFaucetAnimationOver = () => {
  router.push({
    name: 'congratulation',
    params: { challenge: 'mei', level: 2 }
  })
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-center spritesheet bg-cozinha relative w-full h-full"
  >
    <BaseImg img="sustent_torneira" class="absolute" style="top: 22.5%; left: 45%; width: 8.6%" />
    <BaseImg img="sustent_pia" class="absolute z-[30]" style="top: 45.76%; left: 30%; width: 34%" />

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
    <BaseAnimation
      v-show="showPipesAnimation"
      ref="refPipesAnimation"
      :spritesheet="pipesAnimation.sprite"
      :json="pipesAnimation.json"
      :fps="8"
      :isLoop="false"
      :autoplay="false"
      width="824px"
      class="absolute origin-top-left"
      :class="showFaucetAnimation ? '!top-[452px] !right-[2.25%]' : '!top-[312px] !right-[2.25%]'"
      @animationOver="handlePipesAnimationOver"
    />

    <div v-show="showVegetables">
      <BaseImg
        img="sustent_cestavazia3"
        class="absolute z-30"
        style="top: 33.5%; left: 12%; width: 15%"
      />

      <DropElement
        :expected="vegetables.map((v) => v.id)"
        @dropped="handleVegetableDrop"
        class="absolute"
        style="top: 35%; left: 34%; width: 28%; height: 20%; z-index: 10"
      />

      <BaseImg
        v-for="vegetable in vegetables"
        v-show="vegetable.inSink"
        :key="'dropped-' + vegetable.id"
        :img="vegetable.sprite"
        class="absolute"
        :style="{
          top: vegetable.top,
          left: vegetable.left,
          width: vegetable.width + ' !important',
          zIndex: 1
        }"
      />

      <DragElement
        v-for="vegetable in vegetables"
        v-show="!vegetable.inSink"
        :key="vegetable.id"
        :dataTransfer="vegetable.id"
        :style="{
          top: vegetable.top,
          left: vegetable.left,
          width: vegetable.width + ' !important',
          zIndex: 20
        }"
      >
        <BaseImg :img="vegetable.sprite" />
      </DragElement>
    </div>

    <BaseAnimation
      v-show="showFaucetAnimation"
      ref="refFaucetAnimation"
      :spritesheet="faucetAnimation.sprite"
      :json="faucetAnimation.json"
      :fps="8"
      :autoplay="false"
      :isLoop="false"
      class="absolute origin-top-left"
      :class="showFaucetAnimation ? '!top-[-375px] left-[-18px]' : '!top-[-160px] left-[-18px]'"
      @animationOver="handleFaucetAnimationOver"
    />

    <div
      v-if="showOverlay"
      class="absolute top-0 left-0 w-full bg-black opacity-60 pointer-events-none z-[40]"
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
