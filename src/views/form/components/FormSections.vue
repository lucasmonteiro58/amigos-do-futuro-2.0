<script setup>
import { formQuestions, citys } from '@/consts'

const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['gender', 'next'])

const userStore = useUserStore()

const currentQuestion = computed(() => {
  return formQuestions[props.index]
})

const type = computed(() => {
  return currentQuestion.value.type
})

const placeholder = computed(() => {
  return currentQuestion.value.placeholder
})

const replacedTitle = computed(() => {
  return currentQuestion.value.title.replace('#user', userStore.name)
})

function clickGender(value) {
  userStore.setGender(value)
  emit('gender', value)
}

function nextQuestion() {
  emit('next')
}
</script>

<template>
  <div class="h-full w-full flex flex-col justify-center items-center pb-24">
    <BaseImg img="robot-balloon" width="1050px">
      <div class="pl-[120px] py-12 pr-10 font-semibold">
        <div class="text-primary-blue-dark font-bungee text-[2.6rem] text-center">
          {{ replacedTitle }}
        </div>
      </div>
    </BaseImg>
    <div v-if="type === 'btn'" class="flex justify-center mt-12 gap-x-6">
      <BaseButton
        @click="clickGender('girl')"
        name="btn-action-orange"
        label="Menina"
        width="260px"
      ></BaseButton>
      <BaseButton
        @click="clickGender('boy')"
        name="btn-action-orange"
        label="Menino"
        width="260px"
      ></BaseButton>
    </div>
    <div class="mt-10" v-if="type === 'text'">
      <BaseInputText
        v-model="userStore.name"
        :placeholder="placeholder"
        :type="type"
      ></BaseInputText>
    </div>
    <div class="mt-10" v-if="type === 'number'">
      <BaseInputText
        v-model="userStore.age"
        :placeholder="placeholder"
        :type="type"
      ></BaseInputText>
    </div>
    <div class="mt-10" v-if="type === 'select'">
      <BaseInputSelect
        v-model="userStore.city"
        :options="citys"
        :placeholder="placeholder"
      ></BaseInputSelect>
    </div>
    <div class="flex justify-center mt-10" v-if="index === 1 || index === 2">
      <BaseButton
        name="btn-action-orange"
        label="Próximo"
        width="260px"
        @click="nextQuestion"
      ></BaseButton>
    </div>
    <div class="flex justify-center mt-14" v-if="index === 3">
      <BaseButton name="btn-action-orange" label="Enviar" width="260px"></BaseButton>
    </div>
  </div>
</template>
