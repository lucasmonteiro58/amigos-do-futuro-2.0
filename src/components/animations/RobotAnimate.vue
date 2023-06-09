<script setup>
const props = defineProps({
  id: {
    type: [String, Number],
    default: 'robot-speak'
  },
  animation: {
    type: Object,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  width: {
    type: String,
    default: '100%'
  }
})

const speak = ref(true)
const noSpeak = ref(false)
const timeout = ref(null)
const id = computed(() => props.id)

const robotSpeak = ref(null)
const robotNoSpeak = ref(null)

function play() {
  speak.value = true
  robotSpeak.value.play(2, 18)
  startTimeSpeaking(props.time)
}

function startTimeSpeaking(time) {
  timeout.value = setTimeout(() => {
    initNoSpeak()
  }, time)
}

function initNoSpeak() {
  clearTimeout(timeout.value)
  speak.value = false
  noSpeak.value = true
  if (robotSpeak.value) robotSpeak.value.stop()
  if (robotNoSpeak.value) robotNoSpeak.value.play(18, 20)
}

function playNoSpeak() {
  if (robotNoSpeak.value) robotNoSpeak.value.stop()
  if (robotSpeak.value) robotNoSpeak.value.play(21, 38)
}

function resetAnimation() {
  clearTimeout(timeout.value)
  timeout.value = null
  speak.value = false
  noSpeak.value = false
  if (robotSpeak.value) robotSpeak.value.stop()
  if (robotNoSpeak.value) robotNoSpeak.value.stop()
}

function playAgain() {
  resetAnimation()
  play()
}

onMounted(() => {
  play()
})

defineExpose({
  playAgain,
  initNoSpeak
})

watch(id, () => {
  playAgain()
})
</script>

<template>
  <div>
    <BaseAnimation
      ref="robotSpeak"
      v-show="speak"
      :spritesheet="animation.sprite"
      :json="animation.json"
      :fps="10"
      :autoplay="false"
      :width="width"
    ></BaseAnimation>
    <BaseAnimation
      ref="robotNoSpeak"
      v-show="noSpeak"
      :spritesheet="animation.sprite"
      :json="animation.json"
      :fps="10"
      :autoplay="false"
      :width="width"
      @animationOver="playNoSpeak"
    ></BaseAnimation>
  </div>
</template>
