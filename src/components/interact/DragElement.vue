<script setup>
import interact from 'interactjs'

const props = defineProps({
  dataTransfer: {
    type: [Object, String],
    required: false,
    default: () => {}
  },
  dropeed: {
    type: Boolean,
    default: false
  },
  className: {
    type: [String, Array],
    default: 'idle'
  },
  onStartEvent: {
    type: Function,
    default: () => {}
  },
  onEndEvent: {
    type: Function,
    default: () => {}
  },
  isSigmoid: {
    type: Boolean,
    default: true
  }
})

// const dragging = ref(false)
const initialSnapTarget = reactive({
  targets: [{ x: 0, y: 0, range: Infinity }],
  relativePoints: [{ x: 0, y: 0 }],
  enabled: true,
  endOnly: true,
  offset: 'self'
})
const sigmoidInterval = ref('')
const rotation = ref(0)
const translation = ref('')

const refDrag = ref(null)

function onMove(event) {
  if (sigmoidInterval.value !== '') clearInterval(sigmoidInterval.value)
  const target = event.target
  const initialX = parseFloat(target.getAttribute('data-x')) || 0
  const initialY = parseFloat(target.getAttribute('data-y')) || 0

  // width height fixed
  const widthRatio = window.innerWidth / 1920
  const heightRatio = window.innerHeight / 1080
  const min = Math.min(widthRatio, heightRatio)

  const newX = initialX + event.dx / min
  const newY = initialY + event.dy / min
  translation.value = target.style.transform = `translate(${newX}px, ${newY}px)`

  target.style.transition = '0s'
  rotate(event.dx, target, translation.value)
  sigmoidInterval.value = setInterval(() => rotate(0, target, translation.value), 1000 / 60)

  target.setAttribute('data-x', newX)
  target.setAttribute('data-y', newY)
}

function onStart(event) {
  const rect = interact.getElementRect(event.target)

  const startX = rect.left + rect.width / 2
  const startY = rect.top + rect.height / 2

  event.target.setAttribute('data-start-x', startX)
  event.target.setAttribute('data-start-y', startY)
  //onstartEvent(dataTransfer)
  const target = event.target
  target.classList.add('start-drag')
}

function onEnd(event) {
  if (sigmoidInterval.value !== '') clearInterval(sigmoidInterval.value)
  event.target.style.transition = '0.1s'
  event.target.style.transform = translation.value + ' rotate(0deg)'
  // onendEvent(dataTransfer)
  const target = event.target
  target.classList.remove('start-drag')
}

function sigmoid(x) {
  return x / (1 + Math.abs(x))
}

function rotate(x, target, translation) {
  if (props.isSigmoid) {
    rotation.value = rotation.value * 0.9 + sigmoid(x) * 2
    target.style.transform = translation + `rotate(${rotation.value}deg)`
    if (Math.abs(rotation.value) < 0.01) rotation.value = 0
  }
}

onMounted(() => {
  const snap = initialSnapTarget
  interact(refDrag.value).draggable({
    snap,
    inertia: {
      allowResume: false
    },
    restrict: {
      restriction: 'body'
    },
    onmove: (event) => onMove(event),
    onstart: (event) => onStart(event),
    onend: (event) => onEnd(event)
  })
})
</script>

<template>
  <div class="drag-wrap flex items-center justify-center absolute">
    <div
      :class="className"
      :data-transfer="dataTransfer"
      class="slot drag-el"
      draggable="false"
      ref="refDrag"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
[draggable='false'] > * {
  pointer-events: none;
}
</style>
