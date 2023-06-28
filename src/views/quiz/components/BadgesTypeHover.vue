<script setup>
import { badgesTexts } from '@/consts'

const showingBadge = ref(false)
const currentBadge = ref({})

const linesStore = useLinesStore()

const emits = defineEmits(['play', 'stop'])

function showBadge(badge) {
  showingBadge.value = true
  currentBadge.value = badge
  linesStore.playAudio(badge.audio)
  emits('play', badge.duration)
}

function hideBadge() {
  showingBadge.value = false
  currentBadge.value = {}
  linesStore.linesAudios.stop()
  emits('stop')
}
</script>

<template>
  <div class="flex flex-col items-center justify-between h-full">
    <BaseImg img="box-all-badges-certificate" width="700px" class="-mt-16">
      <div class="flex flex-wrap pt-28 px-10 gap-6 justify-center">
        <BaseButton
          v-for="badge in badgesTexts"
          :key="badge.id"
          :name="badge.img"
          @mouseover="showBadge(badge)"
          @mouseleave="hideBadge"
          class="opacity-50 hover:opacity-100 transition-all duration-300 cursor-pointer hover:scale-105"
        >
        </BaseButton>
      </div>
    </BaseImg>
    <BaseImg img="quiz_box-single-badge-full" class="scale-110 -mb-4">
      <div class="flex flex-col items-center py-8 px-8">
        <BaseImg img="quiz_up-arrow"></BaseImg>
        <div
          v-if="showingBadge"
          class="flex flex-col items-center text-[#999999] animation__bounceIn"
        >
          <BaseImg :img="currentBadge.img" class="mt-6"></BaseImg>
          <div class="font-bungee text-center text-[2.6rem] leading-[2.6rem] w-[90%] mt-4">
            {{ currentBadge.title }}
          </div>
          <div class="text-3xl mt-4 w-[80%] text-center text-[#828282]">
            {{ currentBadge.description }}
          </div>
        </div>
        <div v-else class="flex flex-col items-center text-[#999999] animation__fadeIn">
          <div class="font-bungee text-center text-[2.6rem] leading-[2.6rem] w-[70%] mt-8">
            Conheça os poderes dos amigos do futuro!
          </div>
          <div class="text-3xl mt-9 w-[80%] text-center text-[#828282]">
            Passe o mause nas medalhas ali em cima.
          </div>
        </div>
      </div>
    </BaseImg>
  </div>
</template>
