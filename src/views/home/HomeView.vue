<script setup>
import AutoCounter from 'vue3-autocounter'
import counterImg from '@/assets/animations/counter/sprite.png'
import counterJson from '@/assets/animations/counter/sprite.json'
const router = useRouter()

function startGame() {
  router.push({ name: 'form' })
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
    <BaseAnimation
      :spritesheet="counterImg"
      :json="counterJson"
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
  </div>
</template>
