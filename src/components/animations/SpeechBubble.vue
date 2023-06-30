<script setup>
import { robotBlue } from '@/consts'
const props = defineProps({
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
  },
  audio: {
    type: String,
    default: ''
  }
})

const linesStore = useLinesStore()
const isShowing = ref(true)
const refRobot = ref(null)

function close() {
  isShowing.value = false
  linesStore.linesAudios.stop()
}

function open() {
  isShowing.value = true
  playAudio()
}

function playAudio() {
  if (props.audio) linesStore.playAudio(props.audio)
}

function playAgain() {
  refRobot.value.playAgain()
  linesStore.playAudio(props.audio)
}

onMounted(() => {
  playAudio()
})
</script>

<template>
  <div v-if="isShowing" class="fixed w-full h-full z-30">
    <div class="absolute w-full h-full bg-black opacity-50"></div>
    <div
      class="spritesheet box-robot-help absolute bottom-[50px] left-[30px] animation__speechBubbleIn"
    >
      <RobotAnimate
        ref="refRobot"
        :animation="robotBlue"
        :time="time"
        class="absolute top-[15px] left-[3px] scale-[0.38] origin-top-left"
      ></RobotAnimate>
      <div class="w-[524px] h-[209px] relative left-[315px] top-[140px]">
        <div class="font-bungee text-primary-blue text-4xl" v-html="title"></div>
        <div
          class="pt-3 pr-8 font-exo2 font-bold text-gray-500 text-3xl leading-7"
          v-html="description"
        ></div>
        <BaseButton
          @click="close"
          name="btn-toggle-close"
          class="absolute w-[110px] top-[-70px] left-[515px]"
        ></BaseButton>
        <BaseButton
          @click="playAgain"
          name="btn-toggle-repeat"
          width="72px"
          class="absolute top-[150px] left-[498px]"
        ></BaseButton>
      </div>
    </div>
  </div>
  <button
    v-else
    @click="open"
    class="absolute cursor-pointer bottom-5 left-5 hover:!scale-105 animation__speechBubbleOut"
  >
    <BaseImg img="robot-mini-blue" width="150px"> </BaseImg>
  </button>
</template>
