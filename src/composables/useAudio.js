import { useSound } from '@vueuse/sound'
import audio from '@/assets/audios/audio.mp3'
import sprites from '@/assets/audios/audio.json'

export default function useAudio() {
  const { play, stop } = useSound(audio, {
    sprite: sprites.sprite
  })

  function playAudio(name) {
    stop()
    play({ id: name })
  }

  return { playAudio }
}
