<script setup>
import {
  healthyFoods,
  unhealthyFoods,
  platePosition,
  plateDropZone,
  healthBarPosition,
  bilotoInitialLeft,
  bilotoStep,
  successThreshold,
  healthLabelsPosition,
  submitButtonPosition
} from './consts'

const router = useRouter()
const effectsStore = useEffectsStore()

// State
const isCompleted = ref(false)
const showHint = ref(true)
const foodsOnPlate = ref([]) // Array of food names currently on plate
const bilotoLeft = ref(parseInt(bilotoInitialLeft)) // Starts at 49.4% = 948px
const showModalMaxFoods = ref(false)
const showModalNotHealthy = ref(false)
const showModalNeedMoreFoods = ref(false)
const showModalNotHealthyEnough = ref(false)

// Computed
const availableHealthyFoods = computed(() =>
  healthyFoods.filter((food) => !foodsOnPlate.value.includes(food.name))
)

const availableUnhealthyFoods = computed(() =>
  unhealthyFoods.filter((food) => !foodsOnPlate.value.includes(food.name))
)

const foodsOnPlateData = computed(() => {
  return foodsOnPlate.value.map((name) => {
    const healthy = healthyFoods.find((f) => f.name === name)
    const unhealthy = unhealthyFoods.find((f) => f.name === name)
    return healthy || unhealthy
  })
})

const hasUnhealthyFood = computed(() => {
  return foodsOnPlate.value.some((name) => unhealthyFoods.some((f) => f.name === name))
})

// Methods
function onDragStart() {
  showHint.value = false
}

function addFoodToPlate(foodName) {
  if (foodsOnPlate.value.length >= 5) {
    showModalMaxFoods.value = true
    return false
  }

  // Check if food is already on plate
  if (foodsOnPlate.value.includes(foodName)) {
    return false
  }

  foodsOnPlate.value.push(foodName)
  updateBiloto(foodName, true)
  effectsStore.playAudio('feedback_botao_01')
  return true
}

function removeFoodFromPlate(foodName) {
  const index = foodsOnPlate.value.indexOf(foodName)
  if (index > -1) {
    foodsOnPlate.value.splice(index, 1)
    updateBiloto(foodName, false)
    effectsStore.playAudio('feedback_botao_01')
  }
}

function updateBiloto(foodName, isAdding) {
  const isHealthy = healthyFoods.some((f) => f.name === foodName)
  const isUnhealthy = unhealthyFoods.some((f) => f.name === foodName)

  if (isAdding) {
    if (isHealthy) {
      bilotoLeft.value += bilotoStep
    } else if (isUnhealthy) {
      bilotoLeft.value -= bilotoStep
    }
  } else {
    if (isHealthy) {
      bilotoLeft.value -= bilotoStep
    } else if (isUnhealthy) {
      bilotoLeft.value += bilotoStep
    }
  }

  // Clamp biloto position
  const minLeft = parseInt(healthBarPosition.left)
  const maxLeft = minLeft + 672 // width of health bar
  bilotoLeft.value = Math.max(minLeft, Math.min(maxLeft, bilotoLeft.value))
}

function onDropOnPlate(el) {
  const { dataTransfer } = el

  console.log(el)

  // Check if food is already on plate (from plate version)
  if (dataTransfer && dataTransfer.endsWith('-plate')) {
    return // Already on plate, ignore
  }

  if (dataTransfer) {
    addFoodToPlate(dataTransfer)
  }
}

function onDropOutsidePlate(el) {
  const { dataTransfer } = el

  // Only remove if it's a plate version
  if (dataTransfer && dataTransfer.endsWith('-plate')) {
    const foodName = dataTransfer.replace('-plate', '')
    removeFoodFromPlate(foodName)
  }
}

function submitPlate() {
  if (foodsOnPlate.value.length < 5) {
    showModalNeedMoreFoods.value = true
    return
  }

  if (hasUnhealthyFood.value) {
    showModalNotHealthy.value = true
    return
  }

  if (bilotoLeft.value <= successThreshold) {
    showModalNotHealthyEnough.value = true
    return
  }

  // Success!
  isCompleted.value = true
  effectsStore.playAudio('sau_parabens1')

  setTimeout(() => {
    router.push({
      name: 'congratulation',
      params: { challenge: 'sau', level: 1 }
    })
  }, 2000)
}
</script>

<template>
  <main class="flex flex-col justify-center items-center spritesheet cenarioalimentacao">
    <!-- Health bar background -->
    <BaseImg
      img="prato_barra"
      class="absolute"
      :style="{ top: healthBarPosition.top, left: healthBarPosition.left }"
    />

    <!-- Biloto (health indicator) -->
    <BaseImg
      img="prato_biloto"
      class="absolute transition-all duration-500 ease-out"
      :style="{
        top: '964px', // 89.3% * 10.8 = 964.44
        left: `${bilotoLeft}px`
      }"
    />

    <!-- Health labels -->
    <BaseImg
      img="prato_saudavel"
      class="absolute"
      :style="{ top: healthLabelsPosition.top, left: healthLabelsPosition.saudavelLeft }"
    />
    <BaseImg
      img="prato_naosaudavel"
      class="absolute"
      :style="{ top: healthLabelsPosition.top, right: healthLabelsPosition.naoSaudavelRight }"
    />

    <!-- Plate -->
    <BaseImg
      img="prato_prato"
      class="absolute"
      :style="{
        bottom: platePosition.bottom,
        left: platePosition.left,
        width: platePosition.width
      }"
    />

    <!-- Drop zone for outside plate (to remove foods) - must be behind but cover everything -->
    <DropElement
      v-if="foodsOnPlate.length > 0"
      :expected="foodsOnPlateData.map((f) => `${f.name}-plate`)"
      @drag-enter="onDropOutsidePlate"
      class="absolute top-0 left-0 z-10 w-full h-full pointer-events-auto"
    />

    <!-- Drop zone for plate - must be on top to catch drops first -->
    <DropElement
      :expected="
        availableHealthyFoods.map((f) => f.name).concat(availableUnhealthyFoods.map((f) => f.name))
      "
      @dropped="onDropOnPlate"
      @drag-enter="onDropOnPlate"
      class="absolute z-20"
      :style="{
        bottom: platePosition.bottom,
        left: platePosition.left,
        width: plateDropZone.width,
        height: plateDropZone.height
      }"
    />

    <!-- Available healthy foods (draggable) -->
    <DragElement
      v-for="food in availableHealthyFoods"
      :key="food.name"
      :dataTransfer="food.name"
      :style="{
        top: food.top,
        left: food.left,
        right: food.right,
        width: food.width,
        transform: food.scale ? `scale(${food.scale})` : undefined
      }"
      class="absolute z-30"
      @start-drag="onDragStart"
    >
      <div class="spritesheet" :class="food.sprite"></div>
    </DragElement>

    <!-- Available unhealthy foods (draggable) -->
    <DragElement
      v-for="food in availableUnhealthyFoods"
      :key="food.name"
      :dataTransfer="food.name"
      :style="{
        top: food.top,
        left: food.left,
        right: food.right,
        width: food.width
      }"
      class="absolute z-30"
      @start-drag="onDragStart"
    >
      <div class="spritesheet" :class="food.sprite"></div>
    </DragElement>

    <!-- Foods on plate (draggable to remove) -->
    <DragElement
      v-for="food in foodsOnPlateData"
      :key="`${food.name}-plate`"
      :dataTransfer="`${food.name}-plate`"
      :style="{
        top: food.onPlateTop,
        left: food.onPlateLeft,
        width: food.onPlateWidth
      }"
      class="absolute z-30"
      @start-drag="onDragStart"
    >
      <div class="spritesheet" :class="food.spriteOnPlate"></div>
    </DragElement>

    <!-- Submit button -->
    <div
      class="absolute z-30"
      :style="{ bottom: submitButtonPosition.bottom, right: submitButtonPosition.right }"
    >
      <BaseButton
        name="btn-action-white"
        label="Enviar Prato"
        label-color="text-primary-blue-text"
        width="180px"
        @click="submitPlate"
      />
    </div>

    <!-- Hint cursor -->
    <CursorDrag v-if="showHint" class="absolute top-[600px] left-[600px]" width="67%" />

    <!-- Speech bubble -->
    <SpeechBubble
      title="Monte um prato saudável!"
      description="Arraste os alimentos para o prato. Lembre-se: escolha alimentos saudáveis!"
      audio="sau_help0"
      :time="12000"
    />

    <!-- Modals -->
    <ModalAtention v-model="showModalMaxFoods" @close="showModalMaxFoods = false">
      <div class="font-exo2">Você só pode adicionar 5 alimentos no prato!</div>
    </ModalAtention>

    <ModalAtention v-model="showModalNotHealthy" @close="showModalNotHealthy = false">
      <div class="font-exo2">
        Seu prato contém alimentos não saudáveis. Remova-os para continuar!
      </div>
    </ModalAtention>

    <ModalAtention v-model="showModalNeedMoreFoods" @close="showModalNeedMoreFoods = false">
      <div class="font-exo2">Adicione 5 alimentos no prato antes de enviar!</div>
    </ModalAtention>

    <ModalAtention v-model="showModalNotHealthyEnough" @close="showModalNotHealthyEnough = false">
      <div class="font-exo2">
        Seu prato não está saudável ainda. Adicione mais alimentos saudáveis!
      </div>
    </ModalAtention>
  </main>
</template>
