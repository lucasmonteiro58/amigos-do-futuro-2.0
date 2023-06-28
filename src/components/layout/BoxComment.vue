<script setup>
import { robotFull } from '@/consts'

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
    default: '800px'
  },
  bgCongrats: {
    type: Boolean,
    default: false
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
  <BaseImg v-if="bgCongrats" img="sunshine-bg" class="overflow-visible absolute"></BaseImg>
  <BaseImg img="box-comment" class="overflow-visible relative">
    <RobotAnimate
      ref="robotRef"
      :animation="robotFull"
      :width="width"
      :time="time"
      class="absolute top-[-200px] left-[-20px]"
    />
    <BalloonRobot
      class="absolute top-[46px] left-[648px]"
      :text="line"
      :audio="audio"
      @play-again="playAgain"
    />
    <slot></slot>
  </BaseImg>
</template>
