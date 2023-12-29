<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  audio: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'default' // default, down
  }
})

const emit = defineEmits(['play-again'])

const imgBalloon = computed(() => {
  if (props.type === 'down') return 'box-robot-comment-down'
  else return 'balloon-comment'
})

const balloonClass = computed(() => {
  if (props.type === 'down') return 'font-medium text-4xl pt-36'
  else return 'font-bold text-5xl pt-10'
})

const buttonClass = computed(() => {
  if (props.type === 'down') return 'right-[24px] top-[310px]'
  else return 'right-[40px] top-[210px]'
})
</script>

<template>
  <div>
    <BaseImg :img="imgBalloon" class="relative">
      <div v-html="text" class="pl-16 pr-[10rem] font-exo2" :class="balloonClass"></div>
      <BaseButton
        name="btn-toggle-repeat"
        width="80px"
        :class="buttonClass"
        class="absolute"
        @click="emit('play-again')"
      ></BaseButton>
    </BaseImg>
  </div>
</template>
