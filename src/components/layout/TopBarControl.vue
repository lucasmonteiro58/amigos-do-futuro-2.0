<script setup>
const soundStore = useSoundStore()

const router = useRouter()
const linesStore = useLinesStore()

const routerName = computed(() => {
  return router.currentRoute.value.name
})

const soundButton = computed(() => {
  return soundStore.audio ? 'btn-toggle-sound' : 'btn-toggle-mute'
})

const musicButton = computed(() => {
  return soundStore.music ? 'btn-music_ativo' : 'btn-btmusicoff_ativo'
})

const hideBtnMusic = computed(() => {
  return routerName.value === 'cutscene'
})

function routerBack() {
  linesStore.linesAudios.stop()
  router.back()
}
</script>

<template>
  <div class="absolute top-0 right-0 mt-4 mr-4 flex gap-x-4">
    <BaseButton
      v-if="routerName !== 'home'"
      name="btn-toggle-arrow-p"
      width="80px"
      @click="routerBack"
    ></BaseButton>
    <BaseButton
      v-if="!hideBtnMusic"
      :name="musicButton"
      width="80px"
      @click="soundStore.toggleMusic"
    ></BaseButton>
    <BaseButton :name="soundButton" width="80px" @click="soundStore.toggleAudio"></BaseButton>
  </div>
</template>
