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
    default: 'text-[65px]'
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: String,
    default: '100%'
  }
})

const emit = defineEmits(['click'])
const effectsStore = useEffectsStore()

const disabledClass = computed(() => {
  return props.disabled
    ? 'opacity-50 !cursor-not-allowed hover:!scale-100 hover:saturate-[100%] hover:contrast-[100%] active:!saturate-[100%] active:!contrast-[100%] active:!grayscale-0'
    : ''
})

function onClick() {
  if (props.disabled) return
  playAudioClick()
  emit('click')
}

function playAudioHover() {
  effectsStore.plaHoverButton()
}

function playAudioClick() {
  effectsStore.playClickButton()
}
</script>

<template>
  <button
    class="cursor-pointer hover:saturate-[115%] hover:contrast-[108%] hover:scale-105 active:saturate-[60%] active:contrast-[108%] active:grayscale-[45%]"
    :class="disabledClass"
    :disabled="disabled"
    :name="name"
    @click="onClick"
    @mouseover="playAudioHover"
  >
    <BaseImg v-if="name" :img="name" :width="width">
      <div class="flex items-center justify-center h-full py-8 px-12">
        <span v-if="label" class="font-bungee" :class="[labelColor, labelSize]">{{ label }}</span>
        <span class="font-bungee" :class="[labelColor, labelSize]">
          <slot></slot>
        </span>
      </div>
    </BaseImg>
  </button>
</template>
