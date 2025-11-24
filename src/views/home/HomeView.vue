<script setup>
import AutoCounter from 'vue3-autocounter'
import { counterAnimation } from '@/consts'
import ModalInfo from './components/ModalInfo.vue'
const router = useRouter()

const showModal = ref(false)

function startGame() {
  router.push({ name: 'cutscene' })
}

const counterNumber = ref(324)

const prefix = computed(() => {
  if (counterNumber.value < 10) return '0000'
  else if (counterNumber.value < 100) return '000'
  else if (counterNumber.value < 1000) return '00'
  else if (counterNumber.value < 10000) return '0'
  else return ''
})
</script>

<template>
  <div class="spritesheet bg-home flex items-center justify-center flex-col">
    <BaseImg img="logo-complete"></BaseImg>
    <BaseButton name="btn-start" @click="startGame" class="mt-10"></BaseButton>
    <BaseButton
      name="bt-info_ativo"
      @click="showModal = true"
      width="80px"
      class="absolute top-5 left-5"
    ></BaseButton>
    <BaseAnimation
      :spritesheet="counterAnimation.sprite"
      :json="counterAnimation.json"
      autoplay
      :is-loop="false"
      class="mt-[60px] mb-[20px]"
    >
      <div class="font-norwester text-center font-bold text-[85px]">
        <AutoCounter
          :startAmount="0"
          :endAmount="counterNumber"
          :prefix="prefix"
          :duration="2"
        ></AutoCounter>
      </div>
    </BaseAnimation>
    <div class="text-xl mt-8">
      Aqui é a quantidade de Amigos do Futuro que já passaram por aqui.
    </div>
    <ModalInfo v-model="showModal" @close="showModal = false"></ModalInfo>
  </div>
</template>
