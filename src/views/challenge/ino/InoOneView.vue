<script setup>
import Popper from 'vue3-popper'
import { drinkingFountain } from '@/consts/_animations'

const effectsStore = useEffectsStore()

const attempts = ref(0)
const showHint = ref(true)
const isCompleted = ref(false)
const refWaterAnimation = ref(null)

const draggableItems = [
  {
    name: 'vasinho',
    sprite: 'bebedouro_vasinho',
    bottom: '880px',
    left: '666px'
  },
  {
    name: 'regador',
    sprite: 'bebedouro_regador',
    bottom: '200px',
    left: '1323px'
  },
  {
    name: 'garrafao',
    sprite: 'bebedouro_garrafao',
    bottom: '208px',
    left: '330px'
  }
]

const { complete } = useComplete()

function onDragEnd() {
  if (isCompleted.value) return

  attempts.value++
}

function onDrop(el) {
  const { dataTransfer } = el

  if (dataTransfer === 'regador') {
    effectsStore.effectsAudiosLoop.stop()
    isCompleted.value = true

    if (refWaterAnimation.value) {
      refWaterAnimation.value.stop()
    }

    effectsStore.playAudio('feedback_botao_01')

    complete()
  } else {
    effectsStore.playAudio('feedback_mouse_over_itens')
  }
}

function onDragStart() {
  showHint.value = false
}

onMounted(() => {
  effectsStore.playAudioLoop('feedback_inovacao_agua_pingando')
})

onBeforeUnmount(() => {
  effectsStore.effectsAudiosLoop.stop()
})
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet bg-bebedouro">
    <BaseImg img="bebedouro_bebedouro" class="absolute top-[180px]" />

    <BaseAnimation
      v-if="!isCompleted"
      ref="refWaterAnimation"
      :spritesheet="drinkingFountain.sprite"
      :json="drinkingFountain.json"
      :fps="6"
      autoplay
      :isLoop="true"
      width="31%"
      class="absolute top-[295px] left-[6px]"
    />
    <div class="absolute top-[125px] left-[1200px]">
      <Popper placement="bottom-start" offsetDistance="40" locked hover>
        <template #content>
          <div class="w-[400px] rounded-md">
            <div class="text-3xl font-bold pb-2 bg-gray-200 px-4 py-2">Saiba Mais</div>
            <div class="text-2xl px-4 py-2">
              Adryelson e Gabryele da escola Paulo Sá inventaram uma forma de guardar a água
              desperdiçada do bebedouro da sua escola para utilizá-la em outros lugares, como no
              jardim.
            </div>
          </div>
        </template>
        <BaseButton name="btn-toggle-info" width="90px"></BaseButton>
      </Popper>
    </div>

    <DragElement
      v-for="item in draggableItems"
      :key="item.name"
      :dataTransfer="item.name"
      :style="{ bottom: item.bottom, left: item.left }"
      :class="isCompleted && item.name === 'regador' ? 'hidden' : ''"
      @end-drag="onDragEnd"
      @start-drag="onDragStart"
    >
      <div class="spritesheet" :class="item.sprite"></div>
    </DragElement>

    <BaseImg
      v-if="isCompleted"
      img="bebedouro_regador"
      class="absolute bottom-[76px] left-[870px]"
    />

    <DropElement
      :expected="['regador']"
      @dropped="onDrop"
      class="absolute w-[300px] h-[350px] top-[675px] left-[825px]"
    />

    <CursorDrag v-if="showHint" class="absolute top-[600px] left-[600px]" />

    <SpeechBubble
      title="Fique atento!"
      description="Observe a cena e tente resolver o problema."
      audio="ino_help0"
      :time="6000"
    />
  </main>
</template>
