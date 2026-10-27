<script setup>
import { useElementSize } from '@vueuse/core'
import spriteSizes from '@/assets/style/generated-sprites/sizes.json'

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

// The natural size comes from the spritesheet build, so the first render already has the
// right size. Only sprites missing from that list fall back to measuring the element.
const naturalSize = computed(() => spriteSizes[props.img])
const { width: measuredWidth, height: measuredHeight } = useElementSize(
  computed(() => (naturalSize.value ? null : refContent.value))
)
const contentWidth = computed(() => naturalSize.value?.[0] ?? measuredWidth.value)
const contentHeight = computed(() => naturalSize.value?.[1] ?? measuredHeight.value)

// best guess until the container is measured: the natural width, capped by a px `width`
const initialWidth = Math.min(
  naturalSize.value?.[0] ?? 0,
  props.width.endsWith('px') ? parseFloat(props.width) : Infinity
)
const { width: containerWidth } = useElementSize(refContainer, { width: initialWidth, height: 0 })

const getContentHeight = computed(() => {
  return contentHeight.value * scale.value
})

const scale = computed(() => {
  return contentWidth.value ? containerWidth.value / contentWidth.value : 0
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
