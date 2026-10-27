<script setup>
import { useElementSize } from '@vueuse/core'
import { getDrawable } from '@/composables/usePreload'

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

// Per-frame state is kept out of Vue reactivity: it changes ~30x per second and nothing
// in the template depends on it, so tracking it would only add work on the hot path.
const frames = props.json.frames.map((frame) => ({
  name: frame.filename,
  x: frame.frame.x,
  y: frame.frame.y,
  w: frame.frame.w,
  h: frame.frame.h,
  // trimmed frames are drawn at their offset inside the original (untrimmed) frame
  dx: frame.trimmed ? frame.spriteSourceSize.x : 0,
  dy: frame.trimmed ? frame.spriteSourceSize.y : 0
}))
const length = frames.length - 1
let currentIndex = 0
let animationFrameID = null
let yoyodirection = 0
let sprite = null
let ctx = null
let then = 0
let lower = 0
let upper = frames.length
let mounted = false

// sized before mount so the canvas is never resized (and cleared) after the first frame
const source = props.json.frames[0].sourceSize || props.json.frames[0].frame
const widthCanvas = source.w
const height = source.h
const refContent = ref(null)

onMounted(() => {
  sprite = getDrawable(props.spritesheet)
  ctx = refContent.value.getContext('2d')
  mounted = true
  props.autoplay && play()
})

onBeforeUnmount(() => {
  mounted = false
  window.cancelAnimationFrame(animationFrameID)
})

function render() {
  if (!ctx) return
  ctx.clearRect(0, 0, widthCanvas, height)
  if (props.yoyo && currentIndex % length === 0 && currentIndex) {
    yoyodirection = Number(!yoyodirection)
  }
  const index = Math.abs((currentIndex % length) - length * yoyodirection)
  const { x, y, w, h, dx, dy } = frames[index]
  ctx.drawImage(sprite, x, y, w, h, dx, dy, w, h)
}

function loop(now = performance.now()) {
  if (!mounted) return
  const interval = 1000 / props.fps
  const delta = now - then
  if (delta > interval) {
    then = now - (delta % interval)
    render()
    currentIndex++
  }

  if (currentIndex < upper) {
    animationFrameID = window.requestAnimationFrame(loop)
  } else {
    emits('animationOver', currentIndex)
    stop()
    if (props.isLoop) {
      play(lower, upper)
    }
  }
}

function stop() {
  window.cancelAnimationFrame(animationFrameID)
  currentIndex = lower
}

function play(from, to) {
  if (!from) {
    lower = 0
  }

  if (!to) {
    upper = frames.length
  }

  emits('animationStart', currentIndex)
  currentIndex = Number.isNaN(Number(from)) ? currentIndex : from
  lower = Number.isNaN(Number(from)) ? lower : from
  upper = Number.isNaN(Number(to)) ? upper : to
  window.cancelAnimationFrame(animationFrameID)
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
