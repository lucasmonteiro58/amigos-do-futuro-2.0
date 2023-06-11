<script setup>
import { useVModel } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  content: {
    type: String,
    default: ''
  }
})

const modalRef = ref(null)
onClickOutside(modalRef, () => {
  emit('close')
})

const emit = defineEmits(['close'])
const data = useVModel(props, 'modelValue', emit)
</script>
<template>
  <div
    v-if="data"
    class="fixed w-[1920px] h-[1080px] bg-[#0000007f] flex items-center justify-center z-40 top-0 left-0 backdrop-blur"
  >
    <div
      v-motion-pop
      class="w-[600px] bg-white rounded-2xl flex flex-col items-center relative px-10 py-10"
    >
      <div class="text-gray-700 font-bungee text-[1.8rem] text-center leading-7">
        <slot />
      </div>
      <div class="mt-16">
        <BaseButton
          @click="emit('close')"
          name="btn-action-blue"
          label="Entendi"
          width="180px"
        ></BaseButton>
      </div>
      <BaseButton
        @click="emit('close')"
        name="btn-toggle-close"
        width="80px"
        class="absolute top-[-25px] right-[-25px]"
      ></BaseButton>
    </div>
  </div>
</template>
