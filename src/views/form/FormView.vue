<script setup>
import { robotOrange } from '@/consts'
import FormSections from './components/FormSections.vue'

const index = ref(0)

function nextQuestion() {
  if (index.value < 3) {
    index.value++
  } else return
}

function prevQuestion() {
  index.value--
}
</script>

<template>
  <div class="flex">
    <div class="pl-5 w-2/5 bg-white flex flex-col item-center mt-2">
      <RobotAnimate
        :animation="robotOrange"
        :time="3000"
        class="mb-6 flex justify-center"
        width="650px"
      >
      </RobotAnimate>
      <div class="flex justify-center gap-x-10 mr-9">
        <BaseButton
          name="btn-toggle-arrow-p"
          :disabled="index === 0"
          width="110px"
          @click="prevQuestion"
        ></BaseButton>
        <BaseButton name="btn-toggle-arrow" width="110px" @click="nextQuestion"></BaseButton>
      </div>
    </div>
    <div class="w-3/5 bg-primary-blue-dark">
      <FormSections :index="index" v-motion-slide-left :key="index"></FormSections>
    </div>
  </div>
</template>
