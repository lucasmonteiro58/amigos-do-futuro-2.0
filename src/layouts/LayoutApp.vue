<script setup>
import { RouterView } from 'vue-router'

const { assetsLoaded, preloadAssets, loadingProgress } = usePreload()

onMounted(() => {
  preloadAssets()
})
</script>

<template>
  <div
    class="w-[1920px] h-[1080px] mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-xl cursor-auto"
  >
    <LoadingScreen v-if="!assetsLoaded" :progress="loadingProgress" />
    <span v-else v-motion-fade>
      <RouterView class="!h-[1080px] !w-[1920px] app-limit-drag" />
      <TopBarControl />
    </span>
  </div>
</template>

<style>
.wrap-stage {
  width: 1920px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
