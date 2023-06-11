import { defineStore } from 'pinia'
import { useSound } from '@vueuse/sound'
import audio from '@/assets/audios/audio.mp3'
import sprites from '@/assets/audios/audio.json'

export const useLinesStore = defineStore('lines', () => {
  const soundStore = useSoundStore()

  const linesAudios = useSound(audio, {
    sprite: sprites.sprite,
    interrupt: true
  })

  const isAudio = computed(() => soundStore.audio)

  function playAudio(name) {
    if (isAudio.value) linesAudios.play({ id: name })
  }

  watch(isAudio, (value) => {
    if (!value) linesAudios.stop()
  })

  return { playAudio, linesAudios }
})
