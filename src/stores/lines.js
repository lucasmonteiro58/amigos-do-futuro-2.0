import { defineStore } from 'pinia'
import { createAudioChannel } from '@/utils/audio'

//Lines robot store
export const useLinesStore = defineStore('lines', () => {
  const soundStore = useSoundStore()

  const linesAudios = createAudioChannel({ interrupt: true })

  const isAudio = computed(() => soundStore.audio)

  function playAudio(name) {
    if (isAudio.value) linesAudios.play({ id: name })
  }

  watch(isAudio, (value) => {
    if (!value) linesAudios.stop()
  })

  return { playAudio, linesAudios }
})
