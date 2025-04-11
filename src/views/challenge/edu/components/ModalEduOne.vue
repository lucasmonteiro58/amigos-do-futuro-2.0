<script setup>
defineProps({
  features: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'save'])
</script>

<template>
  <div
    class="bg-[#00000086] top-0 left-0 absolute w-full h-full flex items-center justify-center z-50"
  >
    <div class="relative px-20 py-10 text-center spritesheet caixafeedback animation__zoomIn">
      <div class="text-[60px] mt-8 mb-12 text-primary-blue font-bungee">MINHA ESCOLA TEM...</div>

      <div class="flex flex-wrap items-baseline justify-center gap-16 mb-12">
        <div
          v-for="feature in features"
          :key="feature.key"
          class="flex flex-col items-center w-[220px] text-center"
        >
          <BaseImg :img="feature.normalIcon" class="mb-2" />
          <span class="text-[38px] text-black font-exo2 font-medium leading-[38px] mt-4">{{
            feature.text
          }}</span>
        </div>
      </div>

      <div class="flex justify-center gap-20 mt-24">
        <BaseButton name="btn-action-blue" width="400px" label="TROCAR" @click="emit('close')" />
        <BaseButton name="btn-action-blue" width="400px" label="SALVAR" @click="emit('save')" />
      </div>
    </div>
  </div>
</template>
