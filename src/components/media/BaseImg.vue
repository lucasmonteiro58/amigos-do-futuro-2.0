<script setup>
import { useElementSize } from '@vueuse/core'

const props = defineProps({
  img: {
    type: String,
    requerid: true
  },
  width: {
    type: String,
    default: '100%'
  }
})
const refContainer = ref(null)
const refContent = ref(null)

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
    width: `${contentWidth.value}px`,
    maxWidth: `${props.width}`,
    height: `${getContentHeight.value}px`
  }
})

const styleContent = computed(() => {
  return {
    transform: `scale(${scale.value})`
  }
})
</script>

<template>
  <div ref="refContainer" class="overflow-hidden" :style="styleContainer">
    <div ref="refContent" class="spritesheet origin-top-left" :style="styleContent" :class="img">
      <slot></slot>
    </div>
  </div>
</template>
