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

import * as htmlToImage from 'html-to-image'
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
  const node = printRef.value

  const dataUrl = await htmlToImage.toPng(node, {
    quality: 1,
    cacheBust: true,
    fontEmbedder: true
  })

  const link = document.createElement('a')
  link.download = `certificado_${currentBadgeId.value}.png`
  link.href = dataUrl
  link.click()
}
async function handleDownloadPDF() {
  const node = printRef.value

  const dataUrl = await htmlToImage.toPng(node, {
    quality: 1,
    cacheBust: true,
    fontEmbedder: true
  })

  const img = new Image()
  img.src = dataUrl
  await img.decode()

  const pxWidth = img.width
  const pxHeight = img.height

  const pxToMm = (px) => (px * 25.4) / 96

  const mmWidth = pxToMm(pxWidth)
  const mmHeight = pxToMm(pxHeight)

  const pdf = new jsPDF({
    orientation: mmWidth > mmHeight ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [mmWidth, mmHeight]
  })

  pdf.addImage(dataUrl, 'PNG', 0, 0, mmWidth, mmHeight)

  pdf.save(`certificado_${currentBadgeId.value}.pdf`)
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

          <div class="w-[45%] h-full flex items-center justify-center pt-20 relative">
            <div ref="printRef" class="relative w-[650px] h-[800px] z-[10]">
              <img
                :src="`/src/assets/images/cards/${currentBadgeId}.png`"
                class="absolute w-full h-full object-contain"
              />
              <div
                class="absolute top-[58%] px-[50px] text-2xl font-[600] text-center"
                :style="{
                  color: certificateColor
                }"
              >
                {{ certificateText }}
              </div>
            </div>
            <div class="bg-[#cccccc] w-[650px] h-[800px] absolute top-[144px] left-[106px]"></div>
          </div>
        </div>
      </div>

      <ModalBadges v-if="showOtherBadges" @close="closeOtherBadges" />
    </div>
  </main>
</template>
