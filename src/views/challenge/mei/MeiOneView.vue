<script setup>
import Popper from 'vue3-popper'
import { draggableItems, trashBins } from './consts'

const router = useRouter()
const effectsStore = useEffectsStore()

const showHint = ref(true)
const isCompleted = ref(false)
const droppedCount = ref(0)
const hoveredTrash = ref(null)
const dropTimers = ref(new Map())
const droppedItems = ref([])

const isDragging = ref(false)

function isDropped(itemName) {
  return droppedItems.value.includes(itemName)
}

const visibleItems = computed(() => {
  return draggableItems.filter((item) => !isDropped(item.name))
})

function onDragStart() {
  showHint.value = false
  isDragging.value = true
}

function onDragEnd() {
  isDragging.value = false
}

function onDragEnterForBin(eventData, bin) {
  const dataTransfer = eventData.dataTransfer || eventData

  if (bin.accepts.includes(dataTransfer)) {
    hoveredTrash.value = bin.type

    if (dropTimers.value.has(dataTransfer)) {
      clearTimeout(dropTimers.value.get(dataTransfer))
    }

    const timer = setTimeout(() => {
      if (hoveredTrash.value === bin.type && !isDropped(dataTransfer)) {
        handleDrop(dataTransfer)
      }
      dropTimers.value.delete(dataTransfer)
    }, 300)

    dropTimers.value.set(dataTransfer, timer)
  }
}

function onDragLeave(eventData) {
  const dataTransfer = eventData?.dataTransfer || eventData
  if (!dataTransfer) return

  const trashBin = trashBins.find((bin) => bin.accepts.includes(dataTransfer))

  if (trashBin) {
    if (hoveredTrash.value === trashBin.type) {
      if (dropTimers.value.has(dataTransfer)) {
        clearTimeout(dropTimers.value.get(dataTransfer))
        dropTimers.value.delete(dataTransfer)
      }

      hoveredTrash.value = null
    }
  }
}

function handleDrop(dataTransfer) {
  isDragging.value = false
  droppedItems.value.push(dataTransfer)
  droppedCount.value++
  hoveredTrash.value = null

  effectsStore.playAudio('feedback_botao_01')

  if (droppedCount.value === 10) {
    isCompleted.value = true

    setTimeout(() => {
      router.push({
        name: 'congratulation',
        params: { challenge: 'mei', level: 1 }
      })
    }, 1000)
  }
}

function onDrop(el) {
  const { dataTransfer } = el
  isDragging.value = false

  if (dropTimers.value.has(dataTransfer)) {
    clearTimeout(dropTimers.value.get(dataTransfer))
    dropTimers.value.delete(dataTransfer)
  }

  const trashBin = trashBins.find((bin) => bin.accepts.includes(dataTransfer))

  if (trashBin) {
    if (!isDropped(dataTransfer)) {
      handleDrop(dataTransfer)
    }
  } else {
    effectsStore.playAudio('feedback_mouse_over_itens')
    hoveredTrash.value = null
  }
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
      @dropped="onDrop"
      @drag-enter="(el) => onDragEnterForBin(el, bin)"
      @drag-leave="onDragLeave"
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
