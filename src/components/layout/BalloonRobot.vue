<script setup>
defineProps({
  text: {
    type: String,
    default: ''
  },
  audio: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div>
    <BaseImg img="balloon-comment" class="relative">
      <div v-html="text" class="pl-16 pr-28 text-5xl font-exo-bold pt-10"></div>
      <BaseButton
        name="btn-toggle-repeat"
        width="80px"
        class="absolute right-[40px] top-[210px]"
      ></BaseButton>
    </BaseImg>
  </div>
</template>
