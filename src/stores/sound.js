import { defineStore } from 'pinia'

export const useSoundStore = defineStore('sound', () => {
  const audio = ref(true)
  const music = ref(false)

  const bgMusicStore = useBgMusicStore()
  const router = useRouter()
  const routerName = computed(() => router.currentRoute.value.name)

  function toggleAudio() {
    audio.value = !audio.value
  }

  function toggleMusic() {
    music.value = !music.value
    if (music.value) bgMusicStore.play()
    else bgMusicStore.stop()
  }

  watch(routerName, () => {
    if (music.value) bgMusicStore.play()
  })

  return { audio, music, toggleAudio, toggleMusic }
})
