<script setup>
import { ref } from 'vue'
import { useEffectsStore } from '@/stores/effects'
import { useRouter } from 'vue-router'
import { pipes as pipesAnimation } from '@/consts/_animations'

const effectsStore = useEffectsStore()
const router = useRouter()

const isCompleted = ref(false)
const showPipes = ref(true)
const showAnimation = ref(false)
const refPipesAnimation = ref(null)

const pipes = ref([
  {
    id: 1,
    sprite: 'sustent_pc1',
    top: '59%',
    left: '42%',
    width: '11.545%',
    rotation: 180,
    type: 'T'
  },
  {
    id: 2,
    sprite: 'sustent_pc2',
    top: '65.2%',
    left: '26.65%',
    width: '7.58%',
    rotation: 90,
    type: 'L'
  },
  {
    id: 3,
    sprite: 'sustent_pc3',
    top: '65.2%',
    left: '34.2%',
    width: '7.95%',
    rotation: 90,
    type: 'I'
  },
  {
    id: 4,
    sprite: 'sustent_pc4',
    top: '65.2%',
    left: '53.55%',
    width: '7.95%',
    rotation: 90,
    type: 'I'
  },
  {
    id: 5,
    sprite: 'sustent_pc5',
    top: '65.2%',
    left: '61.45%',
    width: '7.58%',
    rotation: 90,
    type: 'L'
  },
  {
    id: 6,
    sprite: 'sustent_pc6',
    top: '79.2%',
    left: '26.65%',
    width: '7.95%',
    rotation: 90,
    type: 'L'
  },
  {
    id: 7,
    sprite: 'sustent_pc7',
    top: '84.6%',
    left: '34.5%',
    width: '7.9%',
    rotation: 90,
    type: 'I'
  },
  {
    id: 8,
    sprite: 'sustent_pc8',
    top: '84.5%',
    left: '42.3%',
    width: '11.545%',
    rotation: 180,
    type: 'T'
  },
  {
    id: 9,
    sprite: 'sustent_pc9',
    top: '84.5%',
    left: '53.6%',
    width: '7.9%',
    rotation: 90,
    type: 'I'
  },
  {
    id: 10,
    sprite: 'sustent_pc10',
    top: '78.95%',
    left: '61.1%',
    width: '7.95%',
    rotation: 90,
    type: 'L'
  }
])

const handlePipeClick = (index) => {
  if (isCompleted.value) return

  effectsStore.playAudio('feedback_sustentabilidade_canos')

  const pipe = pipes.value[index]
  pipe.rotation = (pipe.rotation + 90) % 360

  checkCompletion()
}

const checkCompletion = () => {
  const correctRotations = {
    1: 0,
    2: 0,
    3: 180,
    4: 180,
    5: 0,
    6: 0,
    7: 180,
    8: 0,
    9: 180,
    10: 0
  }

  const allCorrect = pipes.value.every((pipe) => {
    return pipe.rotation === correctRotations[pipe.id]
  })

  if (allCorrect) {
    isCompleted.value = true
    showPipes.value = false
    showAnimation.value = true
    refPipesAnimation.value.play()
  }
}

const handleAnimationOver = () => {
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
    <BaseImg img="sustent_pia" class="absolute" style="top: 45.76%; left: 30%; width: 34%" />
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
      @animationOver="handleAnimationOver"
    />

    <SpeechBubble
      v-if="!isCompleted"
      title="XIII...SEM ÁGUA!"
      description="Essa casa não tem <a>saneamento básico</a>. Ligue os canos para chegar água na torneira!"
      tooltip="Sistema de canos por onde a água chega na nossa casa e por onde sai."
      audio="mei_help2"
      :time="6000"
    />
  </main>
</template>
