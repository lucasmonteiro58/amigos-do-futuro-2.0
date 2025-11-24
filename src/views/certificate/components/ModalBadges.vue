<script setup>
import BaseImg from '@/components/media/BaseImg.vue'
import BaseButton from '@/components/inputs/BaseButton.vue'

import { badgesInfo } from '../consts'

const emit = defineEmits(['close'])

const detailBadgeId = ref(null)
const detailBadge = computed(() => (detailBadgeId.value ? badgesInfo[detailBadgeId.value] : null))

function closeOtherBadges() {
  emit('close')
}

function selectBadge(id) {
  detailBadgeId.value = id
}

function navigateToChallenge(badgeId) {
  console.log('Navigate to:', badgeId)
}
</script>

<template>
  <div class="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
    <div class="relative w-[70%] h-[80%]">
      <BaseImg
        img="bg-certificate"
        class="absolute inset-0 w-full h-full object-cover rounded-xl overflow-hidden"
      />

      <BaseButton
        name="btn-toggle-close"
        class="absolute top-4 right-4 w-12 z-20"
        @click="closeOtherBadges"
      />

      <div class="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div class="w-[70%] h-[50%] relative mb-4">
          <BaseImg img="box-all-badges-certificate" class="w-full h-full object-contain" />
          <div class="absolute inset-0 flex items-center justify-center gap-4 px-12">
            <img
              v-for="(badge, key) in badgesInfo"
              :key="key"
              :src="`/src/assets/images/sprites/quiz/quiz_${key}-badge.png`"
              class="w-[12%] object-contain cursor-pointer hover:scale-110 transition-transform"
              :class="{
                'opacity-100 scale-110': detailBadgeId === key,
                'opacity-80': detailBadgeId && detailBadgeId !== key
              }"
              @click="selectBadge(key)"
              @mouseover="selectBadge(key)"
            />
          </div>
        </div>

        <div class="w-[80%] h-[30%] relative flex items-center justify-center">
          <div v-if="detailBadge" class="text-center bg-white/90 p-6 rounded-xl shadow-lg w-full">
            <h4 class="font-bungee text-[#3E6DAC] text-2xl mb-2">{{ detailBadge.title }}</h4>
            <p class="font-exo-medium text-lg text-gray-700 mb-4">
              {{ detailBadge.description }}
            </p>
            <button
              class="bg-orange-500 text-white font-exo-bold py-2 px-6 rounded-full hover:bg-orange-600 transition-colors"
              @click="navigateToChallenge(detailBadge.id)"
            >
              {{ detailBadge.finished ? 'Recomeçar' : 'Começar' }}
            </button>
          </div>
          <div v-else class="text-center bg-white/90 p-6 rounded-xl shadow-lg w-full">
            <h4 class="font-bungee text-[#3E6DAC] text-2xl mb-2">Escolha outro amigo do futuro!</h4>
            <p class="font-exo-medium text-lg text-gray-700">
              Clique no amigo que quer ajudar agora.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
