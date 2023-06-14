<script setup>
import { cursorDrag } from '@/consts'
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
      :spritesheet="cursorDrag.sprite"
      :json="cursorDrag.json"
      :width="width"
      autoplay
    />
  </div>
</template>
