<script setup>
import { robotBlue } from '@/consts'

const props = defineProps({
  time: {
    type: Number,
    default: 6700
  },
  audio: {
    type: String,
    default: ''
  },
  line: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '400px'
  }
})

const updateKey = ref(0)
const robotRef = ref(null)
const linesStore = useLinesStore()

function playAgain() {
  updateKey.value++
  robotRef.value.playAgain()
  linesStore.playAudio(props.audio)
}

onMounted(() => {
  linesStore.playAudio(props.audio)
})
</script>

<template>
  <BaseImg img="box-comment" class="overflow-visible relative">
    <RobotAnimate
      ref="robotRef"
      :animation="robotBlue"
      :width="width"
      :time="time"
      class="absolute top-[-50px] left-[290px]"
    />
    <BalloonRobot
      type="down"
      class="absolute top-[350px] left-[200px]"
      :text="line"
      :audio="audio"
      @play-again="playAgain"
    />
    <slot></slot>
  </BaseImg>
</template>
