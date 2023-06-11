import { defineStore } from 'pinia'
import { useSound } from '@vueuse/sound'
import audio from '@/assets/audios/audio.mp3'
import sprites from '@/assets/audios/audio.json'

//Lines robot store
export const useLinesStore = defineStore('lines', () => {
  const soundStore = useSoundStore()

  const linesAudios = ref(
    useSound(audio, {
      sprite: sprites.sprite,
      interrupt: true
    })
  )

  const isAudio = computed(() => soundStore.audio)

  function playAudio(name) {
    if (isAudio.value) linesAudios.value.play({ id: name })
  }

  watch(isAudio, (value) => {
    if (!value) linesAudios.value.stop()
  })

  return { playAudio, linesAudios }
})
