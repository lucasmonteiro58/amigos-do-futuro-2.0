<script setup>
const props = defineProps({
  monster: {
    type: Object,
    default: () => {}
  }
})

defineEmits(['close'])

const textColor = computed(() => {
  if (props.monster?.type === 'edu') return 'text-[#376dc4]'
  if (props.monster?.type === 'laz') return 'text-[#e8ad2a]'
  else return 'text-[#e54141]'
})
</script>

<template>
  <div class="bg-[#00000086] top-0 left-0 absolute w-full h-full flex items-center justify-center">
    <div class="spritesheet box-other-badges animation__bounceIn relative">
      <BaseImg :img="monster?.imageBig" class="absolute top-[150px] left-[140px]"></BaseImg>
      <div
        class="text-7xl absolute font-bungee top-[180px] left-[570px] w-[620px] text-center"
        :class="textColor"
      >
        {{ monster?.name }}
      </div>
      <div class="top-[300px] left-[620px] absolute text-4xl w-[550px] text-center">
        {{ monster?.text }}
      </div>
      <BaseButton
        name="btn-action-blue"
        width="400px"
        class="absolute top-[505px] left-[700px]"
        label="Guardar"
        @click="$emit('close')"
      ></BaseButton>
    </div>
  </div>
</template>
