<script setup>
import cutsceneVideo from '@/assets/video/start-cutscene.mp4'

const videoRef = ref(null)
const isPlaying = ref(false)
const router = useRouter()

const bgMusicStore = useBgMusicStore()

function startVideo() {
  videoRef.value.play()
}

function pauseVideo() {
  videoRef.value.pause()
}

function onPlay() {
  isPlaying.value = true
}

function onPause() {
  isPlaying.value = false
}

function onStop() {
  isPlaying.value = false
  goToForm()
}

function clickOnVideo() {
  if (isPlaying.value) pauseVideo()
  else startVideo()
}

function goToForm() {
  router.push({ name: 'form' })
}

onMounted(() => {
  bgMusicStore.stop()
  videoRef.value.addEventListener('ended', onStop)
  videoRef.value.addEventListener('pause', onPause)
  videoRef.value.addEventListener('play', onPlay)
})

onBeforeUnmount(() => {
  videoRef.value.removeEventListener('ended', onStop)
  videoRef.value.removeEventListener('pause', onPause)
  videoRef.value.removeEventListener('play', onPlay)
})
</script>

<template>
  <div class="relative w-full h-full flex justify-center items-center">
    <video
      ref="videoRef"
      class="w-full h-full object-cover"
      :src="cutsceneVideo"
      @click="clickOnVideo"
    ></video>
    <BaseButton
      v-if="!isPlaying"
      name="btn-toggle-play"
      class="absolute animation__bounceIn"
      @click="startVideo"
    ></BaseButton>
    <BaseButton
      v-if="isPlaying"
      name="btn-toggle-pause"
      width="130px"
      class="absolute left-6 bottom-4 animation__bounceIn"
      @click="pauseVideo"
    ></BaseButton>
    <BaseButton
      name="btn-action-white"
      label="Pular"
      label-color="text-primary-blue-text"
      width="210px"
      class="absolute right-6 bottom-6 animation__bounceIn"
      @click="goToForm"
    ></BaseButton>
  </div>
</template>
