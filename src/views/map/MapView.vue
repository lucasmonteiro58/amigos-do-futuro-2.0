<script setup>
import { dragRegions, dropRegions } from '@/consts'

const droppeds = ref([])
const showHelp = ref(true)

function onDrop(el) {
  const { dataTransfer } = el
  droppeds.value.push(dataTransfer)

  if (droppeds.value.length === dropRegions.length) {
    console.log('all dropped')
  }
}

function verifyDropped(name) {
  return droppeds.value.includes(name)
}
</script>

<template>
  <main class="spritesheet bg-mapa-ceara">
    <DragElement
      v-for="el in dragRegions"
      :key="el.name"
      :dataTransfer="el.name"
      :style="{ top: el.top, left: el.left }"
      :class="verifyDropped(el.name) ? 'hidden' : ''"
      @start-drag="showHelp = false"
    >
      <div class="spritesheet" :class="el.image"></div>
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
      <div :class="el.image" class="spritesheet"></div>
    </DropElement>
    <CursorDrag class="absolute top-[500px] left-[750px]" v-if="showHelp" />
    <SpeechBubble
      title="Descobrindo o Ceará"
      description="Encaixe as regiões no mapa. <br/>Precisamos de todas juntas para a nossa aventura!"
      audio="mapa_help"
      :time="7800"
    ></SpeechBubble>
  </main>
</template>
