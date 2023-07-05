<script setup>
defineProps({
  img: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="absolute animation__float">
    <BaseImg :img="img"></BaseImg>
  </div>
</template>
