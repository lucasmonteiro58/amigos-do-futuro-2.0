<script setup>
import { robotFull } from '@/consts'
</script>

<template>
  <div class="bg-home flex items-center justify-center flex-col">
    <div class="logo-complete"></div>
    <div class="font-norwester mt-[60px] mb-[20px] text-center font-bold text-[85px]">00000</div>
    <BaseButton bg="btn-start"></BaseButton>
    <RobotAnimate :animation="robotFull" :time="3000"> </RobotAnimate>
    <div class="text-[22px]">Aqui é a quantidade de Amigos do Futuro que já passaram por aqui.</div>
  </div>
</template>
