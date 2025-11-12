<script setup>
import interact from 'interactjs'

const props = defineProps({
  expected: {
    type: [String, Object, Array],
    required: true
  },
  replaceOnDrop: {
    type: Function,
    default: null
  },
  replaceOnLeave: {
    type: Function,
    default: null
  },
  snap: {
    type: Object,
    default: undefined
  }
})

const emit = defineEmits(['dropped'])

// const dropped = ref([])
// const initialSnapTarget = reactive({
//   targets: [{ x: 0, y: 0, range: Infinity }],
//   relativePoints: [
//     { x: 0, y: 0 }
//   ],
//   enabled: true,
//   endOnly: true,
//   offset: 'self'
// })
// const dropzoneSnap = ref(props.snap || { x: 0, y: 0 })
const draggableElements = ref([])
const refDrop = ref(null)

function onDragEnter(event) {
  const item = event.relatedTarget
  const dataTransfer = event.relatedTarget.getAttribute('data-transfer')

  const expected = props.expected
  const isMatch = Array.isArray(expected)
    ? expected.includes(dataTransfer)
    : dataTransfer === expected

  if (isMatch) {
    item.classList.add('can-drop')
    emit('dropped', { event, dataTransfer })
  }
}

function onDragLeave(event) {
  const item = event.relatedTarget
  item.classList.remove('can-drop')
}

function resetOptionsState() {
  const element = draggableElements.value[0]
  element.el.draggable({ enabled: true })
  element.el.draggable({
    snap: {
      targets: [{ x: 0, y: 0, range: Infinity }],
      relativePoints: [{ x: 0, y: 0 }],
      enabled: true,
      endOnly: true,
      offset: 'self'
    }
  })
  element.dropped.length = 0
  const selector = `#ID-${element.nome}`
  const draggable = document.querySelector(selector).firstElementChild
  draggable.setAttribute('data-x', 0)
  draggable.setAttribute('data-y', 0)
  draggable.style.opacity = '0'
  setTimeout(() => {
    draggable.style.transform = 'translate(0px, 0px)'
  }, 500)
  setTimeout(() => {
    draggable.style.opacity = '1'
  }, 600)
}

function resetOptionsStateWrong() {
  const element = draggableElements.value[0]
  element.el.draggable({ enabled: true })
  element.el.draggable({
    snap: {
      targets: [{ x: 0, y: 0, range: Infinity }],
      relativePoints: [{ x: 0, y: 0 }],
      enabled: true,
      endOnly: true,
      offset: 'self'
    }
  })
  element.dropped.length = 0
  const selector = `#ID-${element.nome}`
  const draggable = document.querySelector(selector).firstElementChild
  draggable.setAttribute('data-x', 0)
  draggable.setAttribute('data-y', 0)
  draggable.style.filter = 'drop-shadow(0px 0px 6px #ff0000)'
  setTimeout(() => {
    draggable.style.transform = 'translate(0px, 0px)'
  }, 500)
}

function onDropActivate() {}
function onDropDeactivate() {}
function onDrop() {}

onMounted(() => {
  interact(refDrop.value).dropzone({
    accept: '.drag-el',
    overlap: 0.75,
    snap: {
      enabled: true
    },
    ondropactivate: (event) => onDropActivate(event),
    ondropdeactivate: (event) => onDropDeactivate(event),
    ondragenter: (event) => onDragEnter(event),
    ondragleave: (event) => onDragLeave(event),
    ondrop: (event) => onDrop(event)
  })
})

defineExpose({
  resetOptionsState,
  resetOptionsStateWrong
})
</script>

<template>
  <div class="drop-el" ref="refDrop">
    <slot />
  </div>
</template>
