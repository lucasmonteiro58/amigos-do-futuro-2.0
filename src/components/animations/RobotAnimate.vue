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

const firstNoSpeak = ref(true)

function play() {
  clearTimeout(timeout.value)
  speak.value = true
  noSpeak.value = false
  robotNoSpeak.value.stop()
  robotSpeak.value.play(2, 18)
}

function stopSpeak() {
  robotSpeak.value.play(2, 18)
  timeout.value = setTimeout(() => {
    firstNoSpeak.value ? initNoSpeak() : playNoSpeak()
    firstNoSpeak.value = false
  }, props.time)
}

function initNoSpeak() {
  clearTimeout(timeout.value)
  speak.value = false
  noSpeak.value = true
  if (robotSpeak.value) robotSpeak.value.stop()
  if (robotNoSpeak.value) robotNoSpeak.value.play(18, 20)
}

function playNoSpeak() {
  clearTimeout(timeout.value)
  if (robotNoSpeak.value) robotNoSpeak.value.stop()
  if (robotSpeak.value) robotNoSpeak.value.play(21, 38)
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
      @animationOver="stopSpeak"
    ></BaseAnimation>
    <BaseAnimation
      ref="robotNoSpeak"
      v-show="noSpeak"
      :spritesheet="animation.sprite"
      :json="animation.json"
      :fps="10"
      :autoplay="false"
      @animationOver="playNoSpeak"
    ></BaseAnimation>
  </div>
</template>
