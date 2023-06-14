<script setup>
import { useElementSize } from '@vueuse/core'

const props = defineProps({
  spritesheet: {
    required: true,
    type: [String, HTMLImageElement],
    default: ''
  },
  json: {
    required: true,
    type: Object
  },
  fps: {
    type: Number,
    default: 10
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  yoyo: {
    type: Boolean,
    default: false
  },
  id: {
    type: String,
    default: 'vue-sprite'
  },
  isLoop: {
    type: Boolean,
    default: true
  },
  width: {
    type: String,
    default: '100%'
  }
})

const emits = defineEmits(['animationStart', 'animationOver'])

const frames = ref([])
const length = ref(0)
const currentIndex = ref(0)
const animationFrameID = ref(null)
const yoyodirection = ref(0)
const sprite = ref(null)
const ctx = ref(null)
const height = ref(0)
const widthCanvas = ref(0)
const now = ref(0)
const then = ref(0)
const lower = ref(0)
const upper = ref(undefined)
const refContent = ref(null)

onMounted(() => {
  props.json.frames.forEach((frame) => {
    frames.value.push({
      name: frame.filename,
      x: frame.frame.x,
      y: frame.frame.y,
      w: frame.frame.w,
      h: frame.frame.h
    })
  })
  frames.value.sort((a, b) => a.filename < b.filename)
  widthCanvas.value = frames.value[0].w
  height.value = frames.value[0].h
  length.value = frames.value.length - 1
  upper.value = frames.value.length
  props.autoplay && play()
})

onBeforeMount(() => {
  nextTick(() => {
    sprite.value = props.spritesheet
    init()
  })
})

function init() {
  ctx.value = refContent.value.getContext('2d')
}

function render() {
  ctx.value && ctx.value.clearRect(0, 0, widthCanvas.value, height.value)
  if (props.yoyo && currentIndex.value % length.value === 0 && currentIndex.value) {
    yoyodirection.value = Number(!yoyodirection.value)
  }
  const index = Math.abs((currentIndex.value % length.value) - length.value * yoyodirection.value)
  const x = frames.value[index].x
  const y = frames.value[index].y
  ctx.value &&
    ctx.value.drawImage(
      sprite.value,
      x,
      y,
      widthCanvas.value,
      height.value,
      0,
      0,
      widthCanvas.value,
      height.value
    )
}

function loop() {
  now.value = Date.now()
  const delta = now.value - then.value
  if (delta > 1000 / props.fps) {
    then.value = now.value - (delta % (1000 / props.fps))
    render()
    currentIndex.value++
  }

  if (currentIndex.value < upper.value) {
    animationFrameID.value = window.requestAnimationFrame(loop)
  } else {
    emits('animationOver', currentIndex.value)
    stop()
    if (props.isLoop) {
      play(lower.value, upper.value)
    }
  }
}

function stop() {
  window.cancelAnimationFrame(animationFrameID.value)
  currentIndex.value = lower.value
}

function play(from, to) {
  if (!from) {
    lower.value = 0
  }

  if (!to) {
    upper.value = frames.value.length
  }

  emits('animationStart', currentIndex.value)
  currentIndex.value = Number.isNaN(Number(from)) ? currentIndex.value : from
  lower.value = Number.isNaN(Number(from)) ? lower.value : from
  upper.value = Number.isNaN(Number(to)) ? upper.value : to
  loop()
}

const refContainer = ref(null)

const { width: containerWidth } = useElementSize(refContainer)
const { width: contentWidth, height: contentHeight } = useElementSize(refContent)

const getContentHeight = computed(() => {
  return contentHeight.value * scale.value
})

const scale = computed(() => {
  return containerWidth.value / contentWidth.value
})

const styleContainer = computed(() => {
  return {
    maxWidth: `${props.width}`,
    height: `${getContentHeight.value}px`
  }
})

const styleContent = computed(() => {
  return {
    transform: `scale(${scale.value})`
  }
})

defineExpose({
  play,
  stop
})
</script>

<template>
  <div class="vue-sprite relative" ref="refContainer" :style="styleContainer">
    <canvas
      :id="id"
      ref="refContent"
      class="origin-top-left"
      :width="widthCanvas"
      :style="styleContent"
      :height="height"
    ></canvas>
    <div class="absolute top-0 w-full" :style="styleContainer">
      <slot></slot>
    </div>
  </div>
</template>
