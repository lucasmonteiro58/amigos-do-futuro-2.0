<script setup>
import { ref, computed } from 'vue'
import Popper from 'vue3-popper'
import { featuresTwo as features, postionsTwo as positions } from './consts'
import ModalViewer from './components/ModalViewer.vue'

const obj = ref(
  features.reduce((acc, f) => {
    acc[f.key] = false
    return acc
  }, {})
)

const hoverKey = ref(null)

// Armazena os selecionados com suas posições fixas
const assignedPositions = ref([]) // [{ key: 'computer', positionIndex: 2 }, ...]

function setVisibility(type) {
  showCursorKeyboard.value = false

  const isSelected = obj.value[type]
  if (isSelected) {
    // Se já estava selecionado, desativa e remove da lista de posições
    obj.value[type] = false
    assignedPositions.value = assignedPositions.value.filter((p) => p.key !== type)
    return
  }

  // Se atingiu o máximo, impede
  if (assignedPositions.value.length >= positions.length) {
    showLimitModal.value = true
    return
  }

  // Seleciona e atribui a próxima posição livre
  obj.value[type] = true
  const usedIndexes = assignedPositions.value.map((p) => p.positionIndex)
  const firstFree = positions.findIndex((_, i) => !usedIndexes.includes(i))

  assignedPositions.value.push({ key: type, positionIndex: firstFree })
}

const isMaxSelected = computed(() => assignedPositions.value.length >= positions.length)

const showCursorKeyboard = ref(true)

const showLimitModal = ref(false)
const showMinModal = ref(false)

function closeModal() {
  showLimitModal.value = false
  showMinModal.value = false
}

const router = useRouter()
const showFinalModal = ref(false)

function handleContinue() {
  if (!isMaxSelected.value) {
    showMinModal.value = true
  } else {
    showFinalModal.value = true
  }
}

function handleSaveFinalChoice() {
  router.push({ name: 'congratulation', params: { challenge: 'edu', level: 2 } })
}

function getButtonIcon(feature) {
  const isActive = obj.value[feature.key]
  const isHovered = hoverKey.value === feature.key
  if (isHovered) {
    return isActive ? feature.minusIcon : feature.addIcon
  }
  return isActive ? feature.checkedIcon : feature.normalIcon
}

const visibleFeatures = computed(() => {
  return assignedPositions.value.map(({ key, positionIndex }) => {
    const feature = features.find((f) => f.key === key)
    return { ...feature, positionIndex }
  })
})
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenarioescola_dentro">
    <div class="spritesheet barradeitens relative bottom-[-435px] flex justify-evenly items-center">
      <div
        v-for="feature in features"
        :key="feature.key"
        class="relative flex items-center justify-center"
      >
        <Popper placement="top" offsetDistance="5" locked hover arrow>
          <template #content>
            <div class="px-4 py-4 text-center w-[300px]">
              <div class="text-2xl">{{ feature.text }}</div>
            </div>
          </template>
          <BaseButton
            class="inline-block"
            :name="getButtonIcon(feature)"
            @click="setVisibility(feature.key)"
            @mouseenter="hoverKey = feature.key"
            @mouseleave="hoverKey = null"
          />
        </Popper>
      </div>
    </div>

    <BaseImg img="escolad_escoladentro" class="absolute bottom-[260px]" />

    <template v-for="feature in visibleFeatures" :key="`img-${feature.key}`">
      <BaseImg
        v-for="(img, i) in feature.images"
        :key="`img-${i}`"
        :img="img.src"
        :class="positions[feature.positionIndex]"
        class="absolute"
      />
    </template>

    <SpeechBubble
      title="Dentro da escola!"
      description="Agora vamos adicionar mais 5 coisas legais dentro da escola."
      audio="edu_help1"
      :time="2000"
    />

    <CursorClick
      v-if="showCursorKeyboard"
      class="absolute scale-[1] opacity-70 bottom-[10px] right-[250px]"
    />

    <BaseButton
      name="btn-toggle-next"
      class="absolute right-[40px] bottom-4"
      width="180px"
      @click="handleContinue"
    />

    <ModalAtention v-model="showLimitModal" @close="closeModal" content-font="font-exo2">
      <div class="mt-8">Selecione somente 5 coisas para sua escola!</div>
    </ModalAtention>

    <ModalAtention v-model="showMinModal" @close="closeModal" content-font="font-exo2">
      <div class="mt-8">Selecione 5 coisas para sua escola!</div>
    </ModalAtention>

    <ModalViewer
      v-if="showFinalModal"
      :features="visibleFeatures"
      @close="showFinalModal = false"
      @save="handleSaveFinalChoice"
    />
  </main>
</template>
