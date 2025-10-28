<script setup>
import { radioTower } from '@/consts'

const refRadioTower = ref(null)

const play = (start, end) => {
  refRadioTower.value.play(start, end)
}

defineExpose({
  play
})
</script>

<template>
  <div>
    <BaseAnimation
      :spritesheet="radioTower.sprite"
      :json="radioTower.json"
      ref="refRadioTower"
      :is-loop="false"
    />
  </div>
</template>
