<script setup>
import { robotFull } from '@/consts'
</script>

<template>
  <div class="flex bg-gradient-to-r from-[#43AD82] to-[#338260] justify-center items-center pt-12">
    <BaseImg img="box-comment" class="overflow-visible relative">
      <RobotAnimate
        v-motion-slide-right
        :animation="robotFull"
        width="800px"
        :time="200"
        class="absolute top-[-200px] left-[-20px]"
      />
      <BalloonRobot
        class="absolute top-[46px] left-[648px]"
        text="¡Hola! Soy el robot de la felicidad, y estoy aquí para ayudarte a ser más feliz. ¿Me ayudas?"
        audio="hola"
      />
    </BaseImg>
  </div>
</template>
