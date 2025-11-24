<script setup>
import { ref, computed, onMounted } from 'vue'

import { useUserStore } from '@/stores/user'
import { useQuizStore } from '@/stores/quiz'
import { useEffectsStore } from '@/stores/effects'
import { badgesInfo } from './consts'
import { robotBlue } from '@/consts/_animations'
import BaseImg from '@/components/media/BaseImg.vue'
import BaseButton from '@/components/inputs/BaseButton.vue'
import ModalBadges from './components/ModalBadges.vue'

import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const userStore = useUserStore()
const quizStore = useQuizStore()
const effectsStore = useEffectsStore()

const showOtherBadges = ref(false)
const refRobot = ref(null)

const printRef = ref(null)

const currentBadgeId = computed(() => quizStore.userBadge || 'sau')
const currentBadge = computed(() => badgesInfo[currentBadgeId.value])
const userName = computed(() => userStore.name || 'Amigo do Futuro')

const certificateText = computed(() => {
  return `Eu ${userName.value}, prometo honrar meu título de Amigo do Futuro e cuidar do Ceará até 2050 pois sei que posso melhorar ainda mais este lugar.`
})

const certificateColor = computed(() => currentBadge.value?.color || '#000')

function playAudio() {
  effectsStore.playAudio('certificate_parabens1')
}

function onRobotClick() {
  playAudio()
  if (refRobot.value) {
    refRobot.value.playAgain()
  }
}

async function handleDownload() {
  if (printRef.value) {
    const canvas = await html2canvas(printRef.value)
    const link = document.createElement('a')
    link.download = `certificado_${currentBadgeId.value}.png`
    link.href = canvas.toDataURL()
    link.click()
  }
}

async function handleDownloadPDF() {
  if (printRef.value) {
    const canvas = await html2canvas(printRef.value)
    const imgData = canvas.toDataURL('image/png')

    const pdf = new jsPDF('l', 'mm', 'a4')
    const width = pdf.internal.pageSize.getWidth()
    const height = pdf.internal.pageSize.getHeight()

    pdf.addImage(imgData, 'PNG', 0, 0, width, height)
    pdf.save(`certificado_${currentBadgeId.value}.pdf`)
  }
}

function openOtherBadges() {
  showOtherBadges.value = true
}

function closeOtherBadges() {
  showOtherBadges.value = false
}

onMounted(() => {
  playAudio()
})
</script>

<template>
  <main class="w-full h-full relative bg-gray-200 overflow-hidden">
    <div class="print:hidden w-full h-full relative">
      <div class="absolute inset-0 flex items-center justify-center">
        <BaseImg img="bg-certificate" class="w-full h-full object-cover" />
      </div>

      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-[95%] h-[90%] flex relative">
          <div class="w-[55%] h-full relative flex items-center flex-col">
            <RobotAnimate ref="refRobot" :animation="robotBlue" :time="5000" width="400px" />

            <BaseImg img="box-comment-certificate" class="w-full h-full mt-8">
              <div class="lex items-center justify-center pt-16 px-8">
                <p class="text-primary-blue-dark font-medium font-exo-medium text-4xl text-center">
                  Parabéns! Agora você pode ajudar a melhorar o futuro do Ceará! Salve ou imprima
                  seu título de honra.
                </p>
              </div>
              <BaseButton
                name="btn-toggle-repeat"
                class="absolute bottom-4 right-6"
                width="50px"
                @click="onRobotClick"
              />
            </BaseImg>
            <div class="flex justify-center gap-6 mt-8">
              <BaseButton name="btn-toggle-download" @click="handleDownload" width="100px" />
              <BaseButton name="btn-toggle-print" @click="handleDownloadPDF" width="100px" />
              <BaseButton name="btn-action-white" width="300px" @click="openOtherBadges">
                <div class="font-exo-bold text-primary-blue-text text-5xl leading-[1.2]">
                  Outros Desafios
                </div>
              </BaseButton>
            </div>
          </div>

          <div
            ref="printRef"
            class="w-[45%] h-full relative flex items-center justify-center pt-10"
          >
            <img
              v-if="currentBadgeId"
              :src="`/src/assets/images/cards/${currentBadgeId}.png`"
              class="w-[650px] absolute"
            />
            <div
              class="absolute top-[60%] px-[125px] text-2xl font-medium text-center"
              :style="{ color: certificateColor }"
            >
              {{ certificateText }}
            </div>
          </div>
        </div>
      </div>

      <ModalBadges v-if="showOtherBadges" @close="closeOtherBadges" />
    </div>
  </main>
</template>
