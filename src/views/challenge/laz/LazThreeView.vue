<script setup>
import Popper from 'vue3-popper'
import { cursorClick } from '@/consts/_animations'

const effectsStore = useEffectsStore()

const isCompleted = ref(false)
const showHint = ref(true)
const foundErrors = ref(0)
const errors = ref([false, false, false, false, false, false, false])

// Coordinates from style.css #erroX1 to #erroX7
const items = [
  {
    // #erroX1
    marker: { top: '42%', left: '75%', width: '4.5%' },
    // #erroX1DIV
    zone: { top: '42%', left: '75%', width: '4.9%', height: '10%' },
    info: 'Já pensou quanto tempo custa deixar tudo bonito e limpo?'
  },
  {
    // #erroX2
    marker: { top: '41%', left: '66%', width: '2%' },
    // #erroX2DIV
    zone: { top: '41%', left: '66%', width: '2%', height: '6%' },
    info: 'Alguém vai ter que pagar por isso.'
  },
  {
    // #erroX3
    marker: { top: '57%', left: '66%', width: '2.5%' },
    // #erroX3DIV
    zone: { top: '57%', left: '66%', width: '2.9%', height: '6%' },
    info: 'Um lugar sujo é feio e fede.'
  },
  {
    // #erroX4
    marker: { top: '56%', left: '76.2%', width: '2.4%' },
    // #erroX4DIV
    zone: { top: '56%', left: '76.2%', width: '2.4%', height: '6%' },
    info: 'Se arrancar as flores elas deixarão de embelezar os lugares.'
  },
  {
    // #erroX5
    marker: { top: '69%', left: '60.5%', width: '2.4%' },
    // #erroX5DIV
    zone: { top: '69%', left: '60.5%', width: '2.4%', height: '6%' },
    info: 'Sem parquinho ninguém brinca mais.'
  },
  {
    // #erroX6
    marker: { top: '65.5%', left: '75.2%', width: '2.2%' },
    // #erroX6DIV
    zone: { top: '65.5%', left: '75.2%', width: '2.2%', height: '6%' },
    info: 'Isso é perigoso e destrói lugares antigos.'
  },
  {
    // #erroX7
    marker: { top: '64.5%', left: '79.3%', width: '1.9%' },
    // #erroX7DIV
    zone: { top: '64.5%', left: '79.3%', width: '1.9%', height: '6%' },
    info: 'Vamos ficar sem ter onde sentar.'
  }
]

const { complete } = useComplete()

function onClickError(index) {
  if (errors.value[index]) return

  showHint.value = false
  errors.value[index] = true
  foundErrors.value++
  effectsStore.playAudio('feedback_botao_01')

  if (foundErrors.value === 7) {
    isCompleted.value = true
    complete()
  }
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet bg-sete-erros">
    <!-- Click Zones with Popper -->
    <div
      v-for="(item, index) in items"
      :key="`zone-${index}`"
      class="absolute cursor-pointer"
      @click="onClickError(index)"
      :style="{
        top: item.zone.top,
        left: item.zone.left,
        width: item.zone.width,
        height: item.zone.height
      }"
    >
      <Popper placement="top" offsetDistance="10" hover>
        <template #content>
          <div
            class="bg-white p-2 rounded shadow-lg text-black text-xl font-bold max-w-[200px] text-center"
          >
            {{ item.info }}
          </div>
        </template>
        <div class="w-full h-full"></div>
      </Popper>
    </div>

    <!-- Markers -->

    <div
      v-for="(item, index) in items"
      :key="`marker-${index}`"
      class="absolute"
      :style="{ top: item.marker.top, left: item.marker.left, width: item.marker.width }"
    >
      <Popper placement="left-end" offsetDistance="10" hover locked arrow>
        <template #content>
          <div class="bg-white p-2 rounded shadow-lg text-black text-xl w-[350px] text-center">
            {{ item.info }}
          </div>
        </template>
        <BaseImg v-if="errors[index]" img="erros_marcadorerro" />
      </Popper>
    </div>

    <!-- Counter -->
    <div class="absolute bottom-0 left-[41%] w-[25%]">
      <BaseImg img="erros_contador_erros" class="w-full" />
      <div class="absolute top-[20%] left-[15%] font-bungee text-[#918274] text-8xl">
        {{ foundErrors }}
      </div>
      <div class="absolute top-[20%] left-[35%] font-bungee text-[#C9C2BB] text-8xl">DE</div>
      <div class="absolute top-[20%] left-[70%] font-bungee text-[#918274] text-8xl">7</div>
    </div>

    <!-- Hint Animation -->
    <BaseAnimation
      v-if="showHint"
      :spritesheet="cursorClick.sprite"
      :json="cursorClick.json"
      :fps="10"
      autoplay
      :isLoop="true"
      width="45%"
      class="absolute bottom-[10%] left-[30%] pointer-events-none"
    />

    <SpeechBubble
      title="7 ERROS."
      description="Hmmm...tem algo de errado na imagem ao lado. Encontre 7 erros."
      audio="laz_help2"
      :time="6000"
    />
  </main>
</template>
