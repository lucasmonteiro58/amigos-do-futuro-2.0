<script setup>
import { dragRegions, dropRegions } from '@/consts'

const totalDropped = ref(0)

function onDrop(event) {
  const item = event.relatedTarget
  const drop = event.target
  item.style.display = 'none'
  drop.style.opacity = '1'
  totalDropped.value++
  if (totalDropped.value === 7) {
    console.log('termunou')
  }
}
</script>

<template>
  <main class="spritesheet bg-mapa-ceara">
    <DragElement
      v-for="el in dragRegions"
      :key="el.name"
      :dataTransfer="el.name"
      :style="{ top: el.top, left: el.left }"
    >
      <div class="spritesheet" :class="el.image"></div>
    </DragElement>
    <DropElement
      v-for="el in dropRegions"
      :key="el.image"
      :expected="el.name"
      :style="{ top: el.top, left: el.left }"
      @dropped="onDrop"
      class="absolute opacity-0"
    >
      <div :class="el.image" class="spritesheet"></div>
    </DropElement>
    <SpeechBubble
      title="Descobrindo o Ceará"
      description="Encaixe as regiões no mapa. <br/>Precisamos de todas juntas para a nossa aventura!"
      :time="1000"
    ></SpeechBubble>
  </main>
</template>
