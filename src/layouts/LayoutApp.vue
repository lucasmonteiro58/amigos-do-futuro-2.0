<script setup>
import { RouterView } from 'vue-router'

const { assetsLoaded, preloadAssets, loadingProgress, routeLoading, routeProgress } = usePreload()

onMounted(() => {
  preloadAssets()
})
</script>

<template>
  <div
    class="w-[1920px] h-[1080px] mx-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-auto overflow-hidden shadow-xl"
  >
    <LoadingScreen v-if="!assetsLoaded" :progress="loadingProgress" />
    <span v-else class="animation__fadeIn">
      <RouterView class="!h-[1080px] !w-[1920px] app-limit-drag" />
      <TopBarControl />
    </span>
    <!-- next screen still downloading in the background -->
    <LoadingScreen v-if="routeLoading" :progress="routeProgress" class="absolute inset-0 z-50" />
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
