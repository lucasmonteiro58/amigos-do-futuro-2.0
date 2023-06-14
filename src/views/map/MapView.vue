<script setup>
import { dragRegions, dropRegions, mapRegions } from '@/consts'
import Popper from 'vue3-popper'

const droppeds = ref([])
const showHelp = ref(true)
const showPopper = ref(true)

function onDrop(el) {
  const { dataTransfer } = el
  droppeds.value.push(dataTransfer)

  if (droppeds.value.length === dropRegions.length) {
    console.log('all dropped')
  }
}

function startDrag() {
  showHelp.value = false
  showPopper.value = false
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
        <div class="spritesheet" :class="el.image"></div>
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
  </main>
</template>
