<script setup>
const soundStore = useSoundStore()

const soundButton = computed(() => {
  return soundStore.audio ? 'btn-toggle-sound' : 'btn-toggle-mute'
})

const musicButton = computed(() => {
  return soundStore.music ? 'btn-music_ativo' : 'btn-btmusicoff_ativo'
})
</script>

<template>
  <div class="absolute top-0 right-0 mt-4 mr-4 flex gap-x-4">
    <BaseButton name="btn-toggle-arrow-p" width="80px"></BaseButton>
    <BaseButton :name="musicButton" width="80px" @click="soundStore.toggleMusic"></BaseButton>
    <BaseButton :name="soundButton" width="80px" @click="soundStore.toggleAudio"></BaseButton>
  </div>
</template>
