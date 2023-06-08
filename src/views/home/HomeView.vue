<script setup>
// import { robotFull } from '@/consts'
</script>

<template>
  <div class="spritesheet bg-home flex items-center justify-center flex-col">
    <div class="spritesheet logo-complete"></div>
    <div class="font-norwester mt-[60px] mb-[20px] text-center font-bold text-[85px]">00000</div>
    <BaseButton name="btn-start"></BaseButton>
    <!-- <RobotAnimate :animation="robotFull" :time="3000"> </RobotAnimate> -->
    <div class="text-xl mt-8">
      Aqui é a quantidade de Amigos do Futuro que já passaram por aqui.
    </div>
    <SpeechBubble
      title="Olá, eu sou o Robozin!"
      description="Eu sou um robô que veio do futuro para te ajudar a aprender sobre o mundo da programação."
      :time="1000"
    ></SpeechBubble>
  </div>
</template>
