<script setup>
import { ref, computed } from 'vue'
import Popper from 'vue3-popper'
import { featuresThree as features } from './consts'
import ModalViewer from './components/ModalViewer.vue'

const obj = ref(
  features.reduce((acc, f) => {
    acc[f.key] = false
    return acc
  }, {})
)

const hoverKey = ref(null)

function setVisibility(type) {
  showCursorKeyboard.value = false
  if (isMaxSelected.value && !obj.value[type]) {
    showLimitModal.value = true
    return
  }
  obj.value[type] = !obj.value[type]
}

function isVisible(type) {
  return obj.value[type]
}

const isMaxSelected = computed(() => {
  return Object.values(obj.value).filter(Boolean).length >= 5
})

const showCursorKeyboard = ref(true)

const visibleFeatures = computed(() => features.filter((feature) => obj.value[feature.key]))

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
  router.push({ name: 'congratulation', params: { challenge: 'edu', level: 1 } })
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet bg-cenario-sala">
    <template v-for="feature in visibleFeatures" :key="`imgs-${feature.key}`">
      <BaseImg
        v-for="(img, index) in feature.images"
        :key="index"
        :img="img.src"
        :class="img.class"
      />
    </template>

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

          <!-- Botão com ícone dinâmico -->
          <BaseButton
            class="inline-block"
            :name="
              hoverKey === feature.key
                ? isVisible(feature.key)
                  ? feature.minusIcon
                  : feature.addIcon
                : isVisible(feature.key)
                  ? feature.checkedIcon
                  : feature.normalIcon
            "
            @mouseenter="hoverKey = feature.key"
            @mouseleave="hoverKey = null"
            @click="setVisibility(feature.key)"
          />
        </Popper>
      </div>
    </div>

    <SpeechBubble
      title="Minha sala de aula!"
      description="Por último, adicione 5 coisas na sala de aula."
      audio="edu_help2"
      :time="6500"
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
