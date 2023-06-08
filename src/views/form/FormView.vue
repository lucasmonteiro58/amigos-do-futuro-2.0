<script setup>
import { robotOrange } from '@/consts'
</script>

<template>
  <div class="flex">
    <div class="w-2/5 bg-white flex flex-col item-center justify-center">
      <RobotAnimate :animation="robotOrange" :time="3000" class="scale-[0.85] mb-5"> </RobotAnimate>
      <div class="flex scale-[0.6] relative bottom-[106px] left-[52px]">
        <BaseButton name="btn-toggle-arrow-p mr-[72px]" disabled></BaseButton>
        <BaseButton name="btn-toggle-arrow"></BaseButton>
      </div>
    </div>
    <div class="w-3/5 bg-primary-blue-dark"></div>
  </div>
</template>
