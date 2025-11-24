<script setup>
import { monsters, eduMachine, lazMachine, sauMachine } from './consts'
import ModalMonsters from './components/ModalMonsters.vue'

const _monsters = ref(monsters)
const showHelp = ref(true)
const showModal = ref(false)
const showBall = ref(false)
const selectedMonster = ref(null)
const coins = ref(40)
const refMachineEdu = ref(null)
const refMachineLaz = ref(null)
const refMachineSau = ref(null)

const eduMonsters = computed(() => {
  return _monsters.value.filter((monster) => monster.type === 'edu')
})

const sauMonsters = computed(() => {
  return _monsters.value.filter((monster) => monster.type === 'sau')
})

const lazMonsters = computed(() => {
  return _monsters.value.filter((monster) => monster.type === 'laz')
})

function randomMonster(type) {
  if (type === 'edu') {
    return eduMonsters.value[Math.floor(Math.random() * eduMonsters.value.length)]
  }
  if (type === 'sau') {
    return sauMonsters.value[Math.floor(Math.random() * sauMonsters.value.length)]
  }
  if (type === 'laz') {
    return lazMonsters.value[Math.floor(Math.random() * lazMonsters.value.length)]
  }
}

function openModal(type) {
  showHelp.value = false
  selectedMonster.value = randomMonster(type)

  if (type === 'edu') {
    refMachineEdu.value.play()
  } else if (type === 'sau') {
    refMachineSau.value.play()
  } else if (type === 'laz') {
    refMachineLaz.value.play()
  }
  coins.value -= 10

  setTimeout(() => {
    showBall.value = true
    setTimeout(() => {
      showModal.value = true
      showBall.value = false
    }, 1000)
  }, 1600)
}

const classBall = computed(() => {
  if (selectedMonster.value?.type === 'edu') return 'top-[820px] left-[420px]'
  if (selectedMonster.value?.type === 'sau') return 'top-[820px] left-[970px]'
  else return 'top-[820px] left-[1510px]'
})

const { complete } = useComplete()

function closeModal() {
  _monsters.value.splice(_monsters.value.indexOf(selectedMonster.value), 1)
  showModal.value = false
  if (coins.value === 0) {
    complete()
  }
}
</script>

<template>
  <main
    class="spritesheet monstrinhos_bg_monstrinhos_economia flex justify-center items-center flex-col"
  >
    <div class="planta_rectmoeda_menor spritesheet absolute top-[20px] left-[20px]">
      <BaseImg img="planta_moeda_eco" class="absolute top-2 left-2"></BaseImg>
      <div class="absolute text-5xl top-[10px] left-[80px] font-norwester">{{ coins }}</div>
    </div>

    <div class="relative">
      <BaseAnimation
        ref="refMachineEdu"
        :spritesheet="eduMachine.sprite"
        autoplay
        :isLoop="false"
        :json="eduMachine.json"
        class="absolute top-[750px] left-[-508px]"
      ></BaseAnimation>
      <BaseAnimation
        ref="refMachineLaz"
        :spritesheet="lazMachine.sprite"
        autoplay
        :isLoop="false"
        :json="lazMachine.json"
        class="absolute top-[79px] left-[585px]"
      ></BaseAnimation>
      <BaseAnimation
        ref="refMachineSau"
        :spritesheet="sauMachine.sprite"
        :isLoop="false"
        autoplay
        :json="sauMachine.json"
        class="absolute top-[-595px] left-[40px]"
      ></BaseAnimation>
    </div>
    <BaseButton
      name="monstrinhos_bt_addmoeda_educ"
      class="absolute top-[120px] left-[340px]"
      @click="openModal('edu')"
    ></BaseButton>
    <BaseButton
      name="monstrinhos_bt_addmoeda_saude"
      class="absolute top-[120px] left-[890px]"
      @click="openModal('sau')"
    ></BaseButton>
    <BaseButton
      name="monstrinhos_bt_addmoeda_lazer"
      class="absolute top-[120px] left-[1430px]"
      @click="openModal('laz')"
    ></BaseButton>
    <BaseImg
      v-if="showBall"
      v-motion-slide-top
      :img="selectedMonster?.image"
      class="absolute"
      :class="classBall"
    ></BaseImg>
    <CursorClick class="absolute top-[140px] left-[480px]" v-if="showHelp" />
    <ModalMonsters v-if="showModal" :monster="selectedMonster" @close="closeModal"></ModalMonsters>
    <SpeechBubble
      title="Coleção de bolinhas!"
      description="Veja o que você ganha se colocar moedas nas máquinas de bolinhas."
      audio="eco_help1"
      :time="6100"
    ></SpeechBubble>
  </main>
</template>
