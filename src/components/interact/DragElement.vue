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

const emit = defineEmits(['start-drag', 'end-drag', 'release'])

// const dragging = ref(false)
const initialSnapTarget = reactive({
  targets: [{ x: 0, y: 0, range: Infinity }],
  relativePoints: [{ x: 0, y: 0 }],
  enabled: true,
  endOnly: true,
  offset: 'self'
})
// rotation eases back to 0 once per frame while dragging; plain variables, nothing renders them
let rotation = 0
let decayFrame = null
const translation = ref('')

const refDrag = ref(null)

function onMove(event) {
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
  decayRotation(target)

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
  emit('start-drag')
  // dragend only fires after the snap back home, so expose the actual release moment
  window.addEventListener('pointerup', () => emit('release'), { once: true })
}

function onEnd(event) {
  cancelAnimationFrame(decayFrame)
  event.target.style.transition = '0.1s'
  event.target.style.transform = translation.value + ' rotate(0deg)'
  // onendEvent(dataTransfer)
  const target = event.target
  target.classList.remove('start-drag')
  emit('end-drag')
}

function sigmoid(x) {
  return x / (1 + Math.abs(x))
}

function rotate(x, target, translation, decay = 0.9) {
  if (props.isSigmoid) {
    rotation = rotation * decay + sigmoid(x) * 2
    if (Math.abs(rotation) < 0.01) rotation = 0
    target.style.transform = translation + `rotate(${rotation}deg)`
  }
}

// keeps easing the rotation back to 0 while the pointer is still; stops by itself at 0
function decayRotation(target) {
  cancelAnimationFrame(decayFrame)
  if (!props.isSigmoid) return
  let last = performance.now()
  const step = (now) => {
    // same speed as the former 60 fps interval, whatever the screen refresh rate
    rotate(0, target, translation.value, Math.pow(0.9, (now - last) / (1000 / 60)))
    last = now
    if (rotation !== 0) decayFrame = requestAnimationFrame(step)
  }
  decayFrame = requestAnimationFrame(step)
}

onBeforeUnmount(() => {
  cancelAnimationFrame(decayFrame)
  // interact.js keeps every element it was given; without this they pile up between screens
  interact(refDrag.value).unset()
})

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
    cursorChecker() {
      return null
    },
    onmove: (event) => onMove(event),
    onstart: (event) => onStart(event),
    onend: (event) => onEnd(event)
  })
})
</script>

<template>
  <div class="absolute flex items-center justify-center drag-wrap cursor-grab">
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

.drag-el.start-drag {
  @apply !cursor-grabbing;
}

.drag-el,
.drag-el * {
  -ms-touch-action: none;
  touch-action: none;
}
</style>
