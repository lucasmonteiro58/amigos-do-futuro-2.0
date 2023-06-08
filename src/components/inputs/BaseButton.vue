<script setup>
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  labelColor: {
    type: String,
    default: 'text-white'
  },
  labelSize: {
    type: String,
    default: 'text-[60px]'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const disabledClass = computed(() => {
  return props.disabled
    ? 'opacity-50 cursor-not-allowed hover:scale-100 hover:saturate-[100%] hover:contrast-[100%] active:!saturate-[100%] active:!contrast-[100%] active:!grayscale-0'
    : ''
})

function onClick() {
  if (props.disabled) return
  emit('click')
}
</script>

<template>
  <button
    class="hover:saturate-[90%] hover:contrast-[130%] active:saturate-[50%] active:contrast-[220%] active:grayscale-[40%]"
    :class="disabledClass"
    :disabled="disabled"
    :name="name"
    @click="onClick"
  >
    <div v-if="name" :class="name" class="spritesheet flex items-center justify-center">
      <span v-if="label" class="font-bungee" :class="[labelColor, labelSize]">{{ label }}</span>
    </div>
  </button>
</template>
