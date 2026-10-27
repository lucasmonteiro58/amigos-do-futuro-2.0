<script setup>
import Popper from 'vue3-popper'
import { draggableItems, trashBins } from './consts'

const effectsStore = useEffectsStore()

const showHint = ref(true)
const droppedItems = ref([])
const hoveredTrash = ref(null)
const isDragging = ref(false)

const visibleItems = computed(() => {
  return draggableItems.filter((item) => !droppedItems.value.includes(item.name))
})

function onItemHover() {
  if (!isDragging.value) effectsStore.playAudio('feedback_mouse_over_itens')
}

function onDragStart() {
  showHint.value = false
  isDragging.value = true
}

function onDragEnd() {
  isDragging.value = false
  hoveredTrash.value = null
}

// Same as v0: the bin opens while a matching item is over it and closes when it leaves
function onDragEnterForBin(bin) {
  hoveredTrash.value = bin.type
}

function onDragLeaveForBin(bin) {
  if (hoveredTrash.value === bin.type) hoveredTrash.value = null
}

const { complete } = useComplete()

// Dropping only counts if the item is released while its bin is open
function onRelease(itemName) {
  const bin = trashBins.find((bin) => bin.type === hoveredTrash.value)
  hoveredTrash.value = null
  isDragging.value = false
  if (!bin?.accepts.includes(itemName) || droppedItems.value.includes(itemName)) return

  droppedItems.value.push(itemName)
  effectsStore.playAudio('feedback_botao_01')

  if (droppedItems.value.length === draggableItems.length) complete()
}
</script>

<template>
  <main class="flex flex-col justify-center items-center spritesheet bg-chao-sujo">
    <BaseImg
      v-for="bin in trashBins"
      :key="`closed-${bin.type}`"
      :img="bin.closedSprite"
      :class="['absolute', hoveredTrash === bin.type ? 'hidden' : '']"
      :style="{ top: bin.top, left: bin.left }"
    />

    <BaseImg
      v-for="bin in trashBins"
      :key="`open-${bin.type}`"
      :img="bin.openSprite"
      :class="['absolute', hoveredTrash === bin.type ? '' : 'hidden']"
      :style="{ top: bin.openTop, left: bin.left }"
    />

    <DragElement
      v-for="item in visibleItems"
      :key="item.name"
      :dataTransfer="item.name"
      :style="{ top: item.top, left: item.left }"
      @start-drag="onDragStart"
      @end-drag="onDragEnd"
      @release="onRelease(item.name)"
      @mouseenter="onItemHover"
    >
      <Popper placement="top-start" offsetDistance="20" locked hover :arrow="!isDragging">
        <div class="drop-shadow-md spritesheet z-[10]" :class="item.sprite"></div>
        <template #content>
          <div class="w-[400px] rounded-md z-[40] relative" v-show="!isDragging">
            <div class="px-4 py-2 pb-2 text-3xl font-bold bg-gray-200 font-exo2">
              {{ item.tooltip.title }}
            </div>
            <div class="px-4 py-2 text-2xl font-exo2">
              {{ item.tooltip.content }}
            </div>
          </div>
        </template>
      </Popper>
    </DragElement>

    <DropElement
      v-for="bin in trashBins"
      :key="`drop-${bin.type}`"
      :expected="bin.accepts"
      :drop-on-enter="false"
      @drag-enter="onDragEnterForBin(bin)"
      @drag-leave="onDragLeaveForBin(bin)"
      class="absolute w-[230px] h-[200px]"
      :style="{ top: bin.top, left: bin.left }"
    />

    <CursorDrag
      v-if="showHint"
      class="absolute top-[718px] left-[735px] scale-[1] rotate-[30deg]"
      width="67%"
    />

    <SpeechBubble
      title="Hora de limpar!"
      description="Transforme um terreno abandonado da sua cidade. Junte e separe o lixo."
      audio="mei_help0"
      :time="6531"
    />
  </main>
</template>
