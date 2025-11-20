<script setup>
import { ref, computed } from 'vue'
import { useEffectsStore } from '@/stores/effects'
import { useRouter } from 'vue-router'

const effectsStore = useEffectsStore()
const router = useRouter()

const isCompleted = ref(false)
const showPipes = ref(true)

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

  effectsStore.playAudio('feedback_sustentabilidade_Canos')

  const pipe = pipes.value[index]
  pipe.rotation = (pipe.rotation + 90) % 360

  checkCompletion()
}

const checkCompletion = () => {
  const allCorrect = pipes.value.every((pipe) => {
    const r = pipe.rotation
    if (pipe.id === 1 || pipe.id === 8) {
      return r === 90
    }
    if ([3, 4, 7, 9].includes(pipe.id)) {
      return r === 90 || r === 270
    }
    if ([2, 5, 6, 10].includes(pipe.id)) {
      return r === 90
    }
    return false
  })

  if (allCorrect) {
    isCompleted.value = true
    showPipes.value = false

    setTimeout(() => {}, 500)
  }
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

    <div
      v-if="!isCompleted"
      class="absolute top-0 left-0 w-full bg-black opacity-60 pointer-events-none"
      style="height: 48.5%"
    ></div>

    <SpeechBubble
      v-if="!isCompleted"
      title="XIII...SEM ÁGUA!"
      description="Essa casa não tem saneamento básico. Ligue os canos para chegar água na torneira!"
      audio="mei_help2"
      :time="6000"
    />
  </main>
</template>
