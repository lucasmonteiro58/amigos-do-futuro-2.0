import { defineStore } from 'pinia'
import { useSound } from '@vueuse/sound'
import background from '@/assets/audios/background.mp3'

export const useBgMusicStore = defineStore('bgMusic', () => {
  const soundStore = useSoundStore()

  const backgoundAudio = ref(
    useSound(background, {
      volume: 0.02
    })
  )
  const isPlaying = computed(() => backgoundAudio.value.isPlaying)

  function play() {
    if (soundStore.music) {
      backgoundAudio.value.play()
    }
  }

  function stop() {
    backgoundAudio.value.stop()
  }

  return { backgoundAudio, play, stop, isPlaying }
})
