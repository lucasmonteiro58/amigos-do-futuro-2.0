import { defineStore } from 'pinia'
import { useSound } from '@vueuse/sound'
import audio from '@/assets/audios/audio.mp3'
import sprites from '@/assets/audios/audio.json'

//Effects sound on buttons
export const useEffectsStore = defineStore('effects', () => {
  const soundStore = useSoundStore()

  const effectsAudios = ref(
    useSound(audio, {
      sprite: sprites.sprite,
      interrupt: true
    })
  )

  const isAudio = computed(() => soundStore.audio)

  function playAudio(name) {
    if (isAudio.value) effectsAudios.value.play({ id: name })
  }

  watch(isAudio, (value) => {
    if (!value) effectsAudios.value.stop()
  })

  //some common effects
  function playClickButton() {
    playAudio('feedback_botao_01')
  }
  function plaHoverButton() {
    playAudio('feedback_mouse_over_itens')
  }

  return { playAudio, effectsAudios, playClickButton, plaHoverButton }
})
