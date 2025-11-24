<script setup>
import { cursorClick } from '@/consts/_animations'

const router = useRouter()
const effectsStore = useEffectsStore()

const isCompleted = ref(false)
const showHint = ref(true)
const checks = ref([false, false, false, false, false, false, false, false])

const items = [
  {
    check: { top: '37.5%', left: '22.2%' },
    zone: { top: '19%', left: '19%', width: '13.5%', height: '24%' }
  },
  {
    check: { top: '44%', left: '38.4%' },
    zone: { top: '25%', left: '35%', width: '13.5%', height: '24%' }
  },
  {
    check: { top: '36.6%', left: '56.4%' },
    zone: { top: '18%', left: '53%', width: '13.5%', height: '24%' }
  },
  {
    check: { top: '48%', left: '71.1%' },
    zone: { top: '30%', left: '68%', width: '13.5%', height: '24%' }
  },
  {
    check: { top: '69.2%', left: '23.3%' },
    zone: { top: '51%', left: '20%', width: '13.5%', height: '24%' }
  },
  {
    check: { top: '77.4%', left: '39.1%' },
    zone: { top: '59%', left: '35%', width: '13.5%', height: '24%' }
  },
  {
    check: { top: '68%', left: '54.2%' },
    zone: { top: '49.5%', left: '53%', width: '13.5%', height: '24%' }
  },
  {
    check: { top: '79%', left: '69%' },
    zone: { top: '61%', left: '67%', width: '13.5%', height: '24%' }
  }
]

function toggleCheck(index) {
  if (isCompleted.value) return

  showHint.value = false
  checks.value[index] = !checks.value[index]
  effectsStore.playAudio('feedback_botao_01')
}

function onNext() {
  if (isCompleted.value) return

  isCompleted.value = true
  effectsStore.playAudio('laz_parabens2')

  setTimeout(() => {
    router.push({
      name: 'congratulation',
      params: { challenge: 'laz', level: 2 }
    })
  }, 2000)
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet bg_album_ultpagina">
    <!-- Click Zones -->
    <div
      v-for="(item, index) in items"
      :key="`zone-${index}`"
      class="absolute cursor-pointer"
      :style="{
        top: item.zone.top,
        left: item.zone.left,
        width: item.zone.width,
        height: item.zone.height
      }"
      @click="toggleCheck(index)"
    ></div>

    <!-- Checkmarks -->
    <BaseImg
      v-for="(item, index) in items"
      :key="`check-${index}`"
      v-show="checks[index]"
      img="album2_check"
      class="absolute pointer-events-none"
      :style="{ top: item.check.top, left: item.check.left, width: '1.8%' }"
    />

    <!-- Hint Animation -->
    <BaseAnimation
      v-if="showHint"
      :spritesheet="cursorClick.sprite"
      :json="cursorClick.json"
      :fps="12"
      autoplay
      :isLoop="true"
      width="45%"
      class="absolute top-[15%] left-[29%] pointer-events-none"
    />

    <!-- Next Button -->
    <BaseButton
      name="btn-toggle-next"
      class="absolute bottom-[42%] right-[4%]"
      width="150px"
      @click="onNext"
    />

    <SpeechBubble
      title="ME CONTA!"
      description="O que tem na sua cidade? Marque as imagens na tela."
      audio="laz_help1"
      :time="6000"
    />
  </main>
</template>
