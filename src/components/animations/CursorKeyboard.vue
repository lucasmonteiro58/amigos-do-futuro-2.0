<script setup>
import { cursorKeyboard } from '@/consts'
defineProps({
  width: {
    type: String,
    default: '100%'
  }
})
</script>

<template>
  <div>
    <BaseAnimation
      :spritesheet="cursorKeyboard.sprite"
      :json="cursorKeyboard.json"
      :width="width"
      autoplay
    />
  </div>
</template>
