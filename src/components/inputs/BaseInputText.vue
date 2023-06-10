<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  width: {
    type: String,
    default: '100%'
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const data = useVModel(props, 'modelValue', emit)
</script>

<template>
  <BaseImg img="input-box" :width="width">
    <input
      v-model="data"
      :type="type"
      :placeholder="placeholder"
      class="w-full h-full bg-transparent outline-0 text-[50px] px-16 py-6 text-center"
    />
  </BaseImg>
</template>
