<script setup>
import { dragRegions, dropRegions, mapRegions } from '@/consts'
import { promiseTimeout } from '@vueuse/core'
import Popper from 'vue3-popper'

const droppeds = ref([])
const showHelp = ref(true)
const showPopper = ref(true)
const showBoxComment = ref(false)
const userStore = useUserStore()
const effectsStore = useEffectsStore()

const commentLine = computed(() => {
  return `Bom trabalho! Agora, precisamos saber que tipo de Amig${
    userStore.gender === 'girl' ? 'a' : 'o'
  } do Futuro você é. Responda as perguntas!`
})

const commentAudio = computed(() => {
  return userStore.gender === 'girl' ? 'mapa_bomtrabalho' : 'mapa_bomtrabalhomenino'
})

function onDrop(el) {
  const { dataTransfer } = el
  droppeds.value.push(dataTransfer)
  effectsStore.playAudio('feedback_mapa_drag')
  if (droppeds.value.length === dropRegions.length) {
    onCompleted()
  }
}

function startDrag() {
  showHelp.value = false
  showPopper.value = false
}

async function onCompleted() {
  await promiseTimeout(2000)
  showBoxComment.value = true
}

function endDrag() {
  showPopper.value = true
}

function verifyDropped(name) {
  return droppeds.value.includes(name)
}
</script>

<template>
  <main class="spritesheet bg-mapa-ceara">
    <div
      v-for="el in mapRegions"
      :key="el.name"
      :style="{ top: el.top, left: el.left }"
      class="absolute"
    >
      <Popper :placement="el.placement" offsetDistance="5" locked hover arrow>
        <BaseImg :img="el.image" class="opacity-0"></BaseImg>
        <template #content v-if="showPopper">
          <div class="px-4 py-4">
            <div class="text-3xl font-bold">{{ el.title }}</div>
            <div class="text-2xl mt-4 whitespace-nowrap" v-html="el.info"></div>
          </div>
        </template>
      </Popper>
    </div>
    <DragElement
      v-for="el in dragRegions"
      :key="el.name"
      :style="{ top: el.top, left: el.left }"
      :dataTransfer="el.name"
      :class="verifyDropped(el.name) ? 'hidden' : ''"
      @start-drag="startDrag"
      @end-drag="endDrag"
    >
      <Popper hover arrow :placement="el.placement" locked offsetDistance="5">
        <div class="spritesheet" :class="el.image" @mouseover="effectsStore.plaHoverButton"></div>
        <template #content v-if="showPopper">
          <div class="px-4 py-4">
            <div class="text-3xl font-bold">{{ el.title }}</div>
            <div class="text-2xl mt-4 whitespace-nowrap" v-html="el.info"></div>
          </div>
        </template>
      </Popper>
    </DragElement>

    <DropElement
      v-for="el in dropRegions"
      :key="el.image"
      :expected="el.name"
      :style="{ top: el.top, left: el.left }"
      @dropped="onDrop"
      class="absolute"
      :class="verifyDropped(el.name) ? 'opacity-100' : 'opacity-0'"
    >
      <Popper hover arrow :placement="el.placement" locked offsetDistance="5">
        <div class="spritesheet" :class="el.image"></div>
        <template #content v-if="showPopper">
          <div class="px-4 py-4">
            <div class="text-3xl font-bold">{{ el.title }}</div>
            <div class="text-2xl mt-4 whitespace-nowrap" v-html="el.info"></div>
          </div>
        </template>
      </Popper>
    </DropElement>
    <CursorDrag class="absolute top-[500px] left-[750px]" v-if="showHelp" />

    <SpeechBubble
      title="Descobrindo o Ceará"
      description="Encaixe as regiões no mapa. <br/>Precisamos de todas juntas para a nossa aventura!"
      audio="mapa_help"
      :time="7800"
    ></SpeechBubble>
    <div
      v-if="showBoxComment"
      class="w-full h-full absolute flex justify-center items-center animation__bounceIn"
    >
      <BoxComment :line="commentLine" width="750px" :audio="commentAudio" :time="8000" bg-congrats>
        <BaseButton
          name="btn-action-blue"
          width="300px"
          class="absolute bottom-[150px] right-[400px]"
          >Vamos lá</BaseButton
        >
      </BoxComment>
    </div>
  </main>
</template>
