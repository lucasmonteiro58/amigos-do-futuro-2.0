<script setup>
import { robotBlue } from '@/consts'
defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  time: {
    type: Number,
    default: 5000
  }
})

const isShowing = ref(true)

const refRobot = ref(null)

function close() {
  isShowing.value = false
}
function open() {
  isShowing.value = true
}
</script>

<template>
  <div v-if="isShowing" class="fixed w-full h-full z-30">
    <div class="absolute w-full h-full bg-black opacity-50"></div>
    <div class="spritesheet box-robot-help absolute bottom-[50px] left-[30px]" v-motion-slide-left>
      <RobotAnimate
        ref="refRobot"
        :animation="robotBlue"
        :time="time"
        class="absolute top-[15px] left-[3px] scale-[0.38] origin-top-left"
      ></RobotAnimate>
      <div class="w-[524px] h-[209px] relative left-[325px] top-[140px]">
        <div class="pt-4 font-bungee text-primary-blue text-4xl" v-html="title"></div>
        <div class="pt-4 font-exo-bold text-gray-500 text-2xl leading-6" v-html="description"></div>
        <BaseButton
          @click="close"
          name="btn-toggle-close"
          class="absolute scale-50 hover:!scale-[0.52] top-[-118px] left-[474px]"
        ></BaseButton>
      </div>
    </div>
  </div>
  <button
    v-else
    v-motion-slide-right
    @click="open"
    class="spritesheet robot-mini-blue absolute bottom-5 left-5 scale-[0.7] hover:scale-[0.72]"
  ></button>
</template>
