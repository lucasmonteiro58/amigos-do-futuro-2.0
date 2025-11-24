<script setup>
import { pages } from './consts'
import { cursorDrag } from '@/consts/_animations'

const effectsStore = useEffectsStore()

const currentPageIndex = ref(0)
const completedStickers = ref([])
const showHint = ref(true)
const isCompleted = ref(false)

const currentPage = computed(() => pages[currentPageIndex.value])
const isLastPage = computed(() => currentPageIndex.value === pages.length - 1)
const isFirstPage = computed(() => currentPageIndex.value === 0)

const currentStickers = computed(() => {
  return currentPage.value.stickers.filter(
    (sticker) => !completedStickers.value.includes(sticker.id)
  )
})

const currentDropZones = computed(() => {
  return currentPage.value.dropZones
})

function onDragStart() {
  showHint.value = false
  effectsStore.playAudio('feedback_mapa_drag')
}

function onDrop(data) {
  const { dataTransfer, event } = data
  const targetId = event.target.dataset.id

  const dropZone = currentDropZones.value.find((z) => z.id === targetId)

  if (dropZone && dropZone.accepts === dataTransfer) {
    effectsStore.playAudio('feedback_lazer_colar_figurinha')
    completedStickers.value.push(dataTransfer)

    checkCompletion()
  } else {
    effectsStore.playAudio('feedback_mouse_over_itens')
  }
}

function checkCompletion() {
  const allStickersOnPage = currentPage.value.stickers.map((s) => s.id)
  const pageCompleted = allStickersOnPage.every((id) => completedStickers.value.includes(id))

  if (pageCompleted && isLastPage.value) {
    finishChallenge()
  }
}

const { complete } = useComplete()

function finishChallenge() {
  if (isCompleted.value) return
  isCompleted.value = true

  complete()
}

function nextPage() {
  if (!isLastPage.value) {
    effectsStore.playAudio('feedback_lazer_virar_pagina')
    currentPageIndex.value++
  }
}

function prevPage() {
  if (!isFirstPage.value) {
    effectsStore.playAudio('feedback_lazer_virar_pagina')
    currentPageIndex.value--
  }
}

function isStickerCompleted(stickerId) {
  return completedStickers.value.includes(stickerId)
}

function canGoNext() {
  const allStickersOnPage = currentPage.value.stickers.map((s) => s.id)
  return allStickersOnPage.every((id) => completedStickers.value.includes(id))
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-center spritesheet"
    :class="currentPage.background"
  >
    <TopBarControl :show-home="true" :show-sound="true" :show-music="true" />

    <DropElement
      v-for="zone in currentDropZones"
      :key="zone.id"
      :expected="[zone.accepts]"
      :data-id="zone.id"
      @dropped="onDrop"
      class="absolute"
      :style="{ top: zone.top, left: zone.left, width: zone.width, height: '28%' }"
    >
      <BaseImg v-if="isStickerCompleted(zone.accepts)" :img="zone.sprite" width="100%" />
    </DropElement>

    <BaseImg
      v-for="sticker in currentPage.stickers"
      :key="sticker.id"
      img="album1_figurascostas"
      class="absolute translate-y-2 translate-x-10"
      :style="{ top: sticker.top, left: sticker.left }"
    />

    <DragElement
      v-for="sticker in currentStickers"
      :key="sticker.id"
      :dataTransfer="sticker.id"
      class="absolute"
      :style="{ top: sticker.top, left: sticker.left, width: sticker.width }"
      @start-drag="onDragStart"
    >
      <BaseImg
        :img="sticker.sprite"
        width="100%"
        class="cursor-grab active:cursor-grabbing hover:-translate-y-14 transition-transform"
      />
    </DragElement>

    <BaseButton
      :disabled="isFirstPage"
      name="btn-toggle-arrow"
      width="100px"
      class="absolute top-[41%] left-[4%] transform rotate-180"
      @click="prevPage"
    />

    <BaseButton
      :disabled="isLastPage || !canGoNext()"
      name="btn-toggle-arrow"
      width="100px"
      class="absolute top-[41%] right-[4%]"
      @click="nextPage"
    />

    <div
      v-if="!isLastPage && !canGoNext()"
      class="absolute top-[41%] right-[4%] opacity-50 grayscale"
    >
      <BaseImg img="btn-toggle-arrow" width="100px" />
    </div>

    <BaseAnimation
      v-if="showHint"
      :spritesheet="cursorDrag.sprite"
      :json="cursorDrag.json"
      :fps="10"
      autoplay
      loop
      width="20%"
      class="absolute top-[24%] left-[4%] pointer-events-none z-50 rotate-[-40deg]"
    />

    <!-- Speech Bubble -->
    <SpeechBubble
      title="Você sabe o que tem de bom no Ceará?"
      description="Complete o álbum de figurinhas e descubra!"
      audio="laz_help0"
      :time="6000"
    />
  </main>
</template>
