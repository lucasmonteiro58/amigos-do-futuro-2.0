<script setup>
import { monsters } from './consts'
import ModalMonsters from './components/ModalMonsters.vue'

const _monsters = ref(monsters)
const showHelp = ref(true)
const showModal = ref(false)
const selectedMonster = ref(null)

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
  selectedMonster.value = randomMonster(type)
  showModal.value = true
}

function closeModal() {
  _monsters.value.splice(_monsters.value.indexOf(selectedMonster.value), 1)
  showModal.value = false
}
</script>

<template>
  <main
    class="spritesheet monstrinhos_bg_monstrinhos_economia flex justify-center items-center flex-col"
  >
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
