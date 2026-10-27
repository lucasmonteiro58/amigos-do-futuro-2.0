import { defineStore } from 'pinia'
import { createAudioChannel } from '@/utils/audio'

//Effects sound on buttons
export const useEffectsStore = defineStore('effects', () => {
  const soundStore = useSoundStore()

  const effectsAudios = createAudioChannel({ interrupt: true })
  const congratsAudios = createAudioChannel({ interrupt: true })
  const effectsAudiosLoop = createAudioChannel({ loop: true })

  const isAudio = computed(() => soundStore.audio)

  function playAudio(name) {
    if (isAudio.value) effectsAudios.play({ id: name })
  }

  function playAudioLoop(name) {
    if (isAudio.value) effectsAudiosLoop.play({ id: name })
  }

  function playAudioCongrats(name) {
    if (isAudio.value) congratsAudios.play({ id: name })
  }

  watch(isAudio, (value) => {
    if (!value) effectsAudios.stop()
    if (!value) congratsAudios.stop()
    if (!value) effectsAudiosLoop.stop()
  })

  //some common effects
  function playClickButton() {
    playAudio('feedback_botao_01')
  }
  function plaHoverButton() {
    playAudio('feedback_mouse_over_itens')
  }
  function playCongratsEffect() {
    playAudioCongrats('feedback_sucesso_geral')
  }

  return {
    playAudio,
    playAudioLoop,
    effectsAudios,
    effectsAudiosLoop,
    congratsAudios,
    playClickButton,
    plaHoverButton,
    playCongratsEffect
  }
})
