<script setup>
const props = defineProps({
  animation: {
    type: Object,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
})

const speak = ref(false)
const noSpeak = ref(false)
const timeout = ref(null)

const robotSpeak = ref(null)
const robotNoSpeak = ref(null)

function play() {
  clearTimeout(timeout.value)
  speak.value = true
  noSpeak.value = false
  robotNoSpeak.value.stop()
  robotSpeak.value.play(2, 18)
}

function overSpeak() {
  robotSpeak.value.play(2, 18)
  timeout.value = setTimeout(() => {
    startNoSpeak()
  }, props.time)
}

function startNoSpeak() {
  clearTimeout(timeout.value)
  speak.value = false
  noSpeak.value = true
  if (robotSpeak.value) robotSpeak.value.stop()
  if (robotNoSpeak.value) robotNoSpeak.value.play(19, 38)
}

function overNoSpeak() {
  clearTimeout(timeout.value)
  robotNoSpeak.value.stop()
  robotNoSpeak.value.play(21, 38)
}

onMounted(() => {
  play()
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
      @animationOver="overSpeak"
    ></BaseAnimation>
    <BaseAnimation
      ref="robotNoSpeak"
      v-show="noSpeak"
      :spritesheet="animation.sprite"
      :json="animation.json"
      :fps="10"
      :autoplay="false"
      @animationOver="overNoSpeak"
    ></BaseAnimation>
  </div>
</template>
