<script setup>
import { formQuestions } from '@/consts'

const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
})

const type = computed(() => {
  return formQuestions[props.index].type
})

const placeholder = computed(() => {
  return formQuestions[props.index].placeholder
})
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center pb-24">
    <BaseImg img="robot-balloon" width="1050px">
      <div class="pl-[120px] py-12 pr-10 font-semibold">
        <div class="text-primary-blue-dark font-bungee text-[2.6rem] text-center">
          {{ formQuestions[index].title }}
        </div>
      </div>
    </BaseImg>
    <div v-if="type === 'btn'" class="flex justify-center mt-12 gap-x-6">
      <BaseButton name="btn-action-orange" label="Menina" width="260px"></BaseButton>
      <BaseButton name="btn-action-orange" label="Menino" width="260px"></BaseButton>
    </div>
    <div class="mt-10" v-if="type === 'text'">
      <BaseInputText :placeholder="placeholder" :type="type"></BaseInputText>
    </div>
    <div class="mt-10" v-if="type === 'number'">
      <BaseInputText :placeholder="placeholder" :type="type"></BaseInputText>
    </div>
    <div class="mt-10" v-if="type === 'select'">
      <div class="spritesheet input-box"></div>
    </div>
    <div class="flex justify-center mt-10" v-if="index === 1 || index === 2">
      <BaseButton name="btn-action-orange" label="Próximo" width="260px"></BaseButton>
    </div>
    <div class="flex justify-center mt-10" v-if="index === 3">
      <BaseButton name="btn-action-orange" label="Enviar" width="260px"></BaseButton>
    </div>
  </div>
</template>
