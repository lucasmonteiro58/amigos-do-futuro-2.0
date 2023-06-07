<script setup>
import LayoutApp from './layouts/LayoutApp.vue'
</script>

<template>
  <LayoutApp />
</template>

<style lang="scss">
@import './assets/style/sprite.scss';
@include sprites($spritesheet-sprites);
</style>
