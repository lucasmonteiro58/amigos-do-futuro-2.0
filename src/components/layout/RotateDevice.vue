<script setup>
import { useMediaQuery } from '@vueuse/core'

// The game is drawn for a landscape screen, so a phone or tablet held upright gets this
// screen instead. It lives outside the scaled 1920x1080 stage (teleported to <body>), so
// its sizes are real screen pixels.
const isPortraitTouch = useMediaQuery('(pointer: coarse) and (orientation: portrait)')
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isPortraitTouch"
      class="rotate-device fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8 bg-[#efefef] px-8 text-center select-none"
    >
      <BaseImg img="robot-mini-blue" width="150px" class="animation__fadeIn"></BaseImg>

      <div class="rotate-device__phone" aria-hidden="true">
        <div class="rotate-device__screen"></div>
      </div>

      <div>
        <div class="font-bungee text-[28px] leading-tight text-primary-blue">Gire o celular</div>
        <div class="font-exo2 text-xl mt-3 text-[#828282]">
          Os Amigos do Futuro jogam com a tela deitada.
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.rotate-device__phone {
  width: 70px;
  height: 120px;
  border: 6px solid #376296;
  border-radius: 14px;
  padding: 6px;
  background: white;
  animation: rotate-device 2.4s ease-in-out infinite;
}

.rotate-device__screen {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: #f0932b;
}

@keyframes rotate-device {
  0%,
  20% {
    transform: rotate(0deg);
  }
  50%,
  80% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
