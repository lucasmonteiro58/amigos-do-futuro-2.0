<script setup>
import { ref } from 'vue'
import { useEffectsStore } from '@/stores/effects'
import { useRouter } from 'vue-router'
import { pipes as pipesAnimation } from '@/consts/_animations'
import { pipesData, correctRotations } from '@/views/challenge/mei/consts'

const effectsStore = useEffectsStore()
const router = useRouter()

const isCompleted = ref(false)
const showPipes = ref(true)
const showAnimation = ref(false)
const refPipesAnimation = ref(null)

const pipes = ref(pipesData)

const handlePipeClick = (index) => {
  if (isCompleted.value) return

  effectsStore.playAudio('feedback_sustentabilidade_canos')

  const pipe = pipes.value[index]
  pipe.rotation = (pipe.rotation + 90) % 360

  checkCompletion()
}

const checkCompletion = () => {
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
