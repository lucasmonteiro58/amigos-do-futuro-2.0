<script setup>
import { robotOrange } from '@/consts'
</script>

<template>
  <div class="flex">
    <div class="w-2/5 bg-white flex flex-col item-center justify-center">
      <RobotAnimate :animation="robotOrange" :time="3000" class="scale-[0.85] mb-5"> </RobotAnimate>
      <div class="flex">
        <BaseButton name="btn-toggle-arrow-p" disabled width="100px"></BaseButton>
        <BaseButton name="btn-toggle-arrow" width="100px"></BaseButton>
      </div>
    </div>
    <div class="w-3/5 bg-primary-blue-dark">
    </div>
  </div>
</template>
