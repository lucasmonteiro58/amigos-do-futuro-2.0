export function useComplete() {
  const router = useRouter()

  const route = useRoute()

  const challenge = computed(() => route.meta.challenge)
  const level = computed(() => route.meta.level)
  const effectStore = useEffectsStore()

  function complete() {
    effectStore.playCongratsEffect()
    setTimeout(() => {
      router.push({
        name: 'congratulation',
        params: { challenge: challenge.value, level: level.value }
      })
    }, 1000)
  }

  return {
    complete
  }
}
