<script setup>
import { useEffectsStore } from '@/stores/effects'

const effectsStore = useEffectsStore()

const isCompleted = ref(false)
const harvestedCount = ref(0)
const router = useRouter()
const holes = ref([
  {
    id: 1,
    type: 'cenoura',
    state: 0,
    positions: {
      0: { top: '71%', left: '21%' },
      1: { top: '66%', left: '21%' },
      2: { top: '60%', left: '21%' }
    }
  },
  {
    id: 2,
    type: 'cenoura',
    state: 0,
    positions: {
      0: { top: '77%', left: '28%' },
      1: { top: '71%', left: '28%' },
      2: { top: '66%', left: '28%' }
    }
  },
  {
    id: 3,
    type: 'tomate',
    state: 0,
    positions: {
      0: { top: '71%', left: '39%' },
      1: { top: '61%', left: '39%' },
      2: { top: '54%', left: '39%' }
    }
  },
  {
    id: 4,
    type: 'tomate',
    state: 0,
    positions: {
      0: { top: '77%', left: '48%' },
      1: { top: '68%', left: '48%' },
      2: { top: '62%', left: '48%' }
    }
  },
  {
    id: 5,
    type: 'alface',
    state: 0,
    positions: {
      0: { top: '71%', left: '60%' },
      1: { top: '67%', left: '60%' },
      2: { top: '64%', left: '60%' }
    }
  },
  {
    id: 6,
    type: 'alface',
    state: 0,
    positions: {
      0: { top: '77%', left: '68%' },
      1: { top: '73%', left: '68%' },
      2: { top: '70%', left: '68%' }
    }
  }
])

// Basket items visibility
const basketItems = ref({
  cenoura1: false,
  cenoura2: false,
  tomate1: false,
  tomate2: false,
  alface1: false,
  alface2: false
})

const handleHoleClick = (index) => {
  const hole = holes.value[index]

  if (hole.state < 2) {
    effectsStore.playAudio('feedback_click_button')
    hole.state++
  } else if (hole.state === 2) {
    // Harvest
    effectsStore.playAudio('feedback_click_button')
    hole.state = 3 // Harvested (hidden from hole)
    addToBasket(hole.type)
    harvestedCount.value++
    checkCompletion()
  }
}

const addToBasket = (type) => {
  // Find first available slot for this type
  if (type === 'cenoura') {
    if (!basketItems.value.cenoura1) basketItems.value.cenoura1 = true
    else basketItems.value.cenoura2 = true
  } else if (type === 'tomate') {
    if (!basketItems.value.tomate1) basketItems.value.tomate1 = true
    else basketItems.value.tomate2 = true
  } else if (type === 'alface') {
    if (!basketItems.value.alface1) basketItems.value.alface1 = true
    else basketItems.value.alface2 = true
  }
}

const checkCompletion = () => {
  if (harvestedCount.value === 6) {
    isCompleted.value = true
    setTimeout(() => {
      router.push({
        name: 'congratulation',
        params: { challenge: 'mei', level: 1 }
      })
    }, 1500)
  }
}

const getSprite = (hole) => {
  if (hole.state === 0) return 'sustent_buraco'
  if (hole.state === 1) return `sustent_${hole.type}1`
  if (hole.state === 2) return `sustent_${hole.type}2`
  return ''
}

const getCursor = (hole) => {
  if (hole.state === 0) return 'cursor-seed'
  if (hole.state === 1) return 'cursor-water'
  if (hole.state === 2) return 'cursor-harvest'
  return ''
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-center spritesheet bg-horta relative w-full h-full"
  >
    <!-- Holes and Plants -->
    <BaseImg
      v-for="(hole, index) in holes"
      :key="hole.id"
      :img="getSprite(hole)"
      width="8.5%"
      class="absolute"
      :class="[hole.state === 3 ? 'hidden' : '', getCursor(hole)]"
      :style="{
        top: hole.positions[hole.state]?.top || '0',
        left: hole.positions[hole.state]?.left || '0',
        width: '8.5% !important'
      }"
      @click="handleHoleClick(index)"
    />

    <!-- Basket -->

    <!-- Harvested Items in Basket -->
    <BaseImg
      v-if="basketItems.cenoura1"
      img="sustent_cenoura"
      class="absolute"
      style="bottom: 21%; right: 12%; width: 11% !important"
    />
    <BaseImg
      v-if="basketItems.cenoura2"
      img="sustent_cenoura"
      class="absolute"
      style="bottom: 23%; right: 11%; width: 11% !important"
    />

    <BaseImg
      v-if="basketItems.tomate1"
      img="sustent_tomate"
      class="absolute"
      style="bottom: 23%; right: 9%; width: 4% !important"
    />
    <BaseImg
      v-if="basketItems.tomate2"
      img="sustent_tomate"
      class="absolute"
      style="bottom: 22%; right: 8%; width: 3.5% !important"
    />

    <BaseImg
      v-if="basketItems.alface1"
      img="sustent_alface"
      class="absolute"
      style="bottom: 20%; right: 4%; width: 7% !important"
    />
    <BaseImg
      v-if="basketItems.alface2"
      img="sustent_alface"
      class="absolute"
      style="bottom: 18%; right: 3%; width: 6% !important"
    />

    <BaseImg img="sustent_cestavazia" class="absolute" style="bottom: 10%; right: 2%" />

    <!-- Intro Bubble -->
    <SpeechBubble
      title="VAMOS PLANTAR!"
      description="Podemos deixar o terreno melhor ainda. Que tal fazer uma horta comunitária?"
      audio="mei_help1"
      :time="6000"
    />
  </main>
</template>

<style scoped>
.cursor-seed {
  cursor:
    url('@/assets/images/sprites/meio/sustent_pointer_semente.png') 0 45,
    auto;
}
.cursor-water {
  cursor:
    url('@/assets/images/sprites/meio/sustent_pointer_regador.png') 10 80,
    auto;
}
.cursor-harvest {
  cursor:
    url('@/assets/images/sprites/meio/sustent_pointer_luva.png') 30 40,
    auto;
}
</style>
