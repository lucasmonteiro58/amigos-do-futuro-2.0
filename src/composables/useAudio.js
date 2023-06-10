import { useSound } from '@vueuse/sound'
import audio from '@/assets/audios/audio.mp3'
import sprites from '@/assets/audios/audio.json'

export default function useAudio() {
  const soundStore = useSoundStore()
  const { play, stop } = useSound(audio, {
    sprite: sprites.sprite,
    interrupt: true
  })

  const isAudio = computed(() => soundStore.audio)

  function playAudio(name) {
    if (isAudio.value) play({ id: name })
  }

  watch(isAudio, (value) => {
    if (!value) stop()
  })

  return { playAudio }
}
