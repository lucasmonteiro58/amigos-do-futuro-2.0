<script setup>
import { ref, computed } from 'vue'
import Popper from 'vue3-popper'
import { features } from './consts'

const obj = ref(
  features.reduce((acc, f) => {
    acc[f.key] = false
    return acc
  }, {})
)

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

function handleContinue() {
  if (!isMaxSelected.value) {
    showMinModal.value = true
  } else {
    router.push({ name: 'congratulation', params: { challenge: 'edu', level: 1 } })
  }
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenarioescola_fora">
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
            :name="isVisible(feature.key) ? feature.checkedIcon : feature.normalIcon"
            @click="setVisibility(feature.key)"
          />
        </Popper>
      </div>
    </div>
    <BaseImg img="escolaf_escolafora_antes" class="absolute bottom-[380px]" />
    <template v-for="feature in visibleFeatures" :key="`imgs-${feature.key}`">
      <BaseImg
        v-for="(img, index) in feature.images"
        :key="index"
        :img="img.src"
        :class="img.class"
      />
    </template>
    <SpeechBubble
      title="Super Escola!"
      description="Adicione 5 coisas que você gostaria que tivesse na sua escola e veja o que acontece."
      audio="edu_help0"
      :time="7500"
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
  </main>
</template>
