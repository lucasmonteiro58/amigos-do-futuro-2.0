<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <div class="!h-[1080px] !w-[1920px] bg-[#efefef] relative flex justify-center">
    <div class="absolute text-6xl top-[420px] font-norwester">{{ progress }}%</div>
    <img src="@/assets/images/loading.gif" alt="loading" />
  </div>
</template>
