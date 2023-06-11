import { defineStore } from 'pinia'

export const useSoundStore = defineStore('sound', () => {
  const audio = ref(true)
  const music = ref(false)

  function toggleAudio() {
    audio.value = !audio.value
  }

  function toggleMusic() {
    music.value = !music.value
  }

  return { audio, music, toggleAudio, toggleMusic }
})
