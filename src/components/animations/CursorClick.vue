<script setup>
import { cursorClick } from '@/consts'
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
      :spritesheet="cursorClick.sprite"
      :json="cursorClick.json"
      :width="width"
      autoplay
    />
  </div>
</template>
