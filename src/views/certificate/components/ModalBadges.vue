<script setup>
import BaseImg from '@/components/media/BaseImg.vue'
import BaseButton from '@/components/inputs/BaseButton.vue'

import { badgesInfo } from '../consts'

const emit = defineEmits(['close'])
const router = useRouter()

const detailBadgeId = ref(null)
const detailBadge = computed(() => (detailBadgeId.value ? badgesInfo[detailBadgeId.value] : null))

function closeOtherBadges() {
  emit('close')
}

function selectBadge(id) {
  detailBadgeId.value = id
}

function navigateToChallenge() {
  router.push(`/desafios/${detailBadgeId.value}/1`)
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="absolute inset-0 z-50 bg-black/50 flex items-center justify-center">
    <BaseImg img="box-other-badges" class="relative">
      <BaseButton
        name="btn-toggle-close"
        class="absolute top-1 right-1"
        width="120px"
        @click="closeOtherBadges"
      />

      <BaseButton
        name="btn-toggle-home"
        class="absolute top-10 left-0"
        width="120px"
        @click="goHome"
      />

      <BaseImg img="box-all-badges-certificate" class="relative top-2 left-[300px] cursor-pointer">
        <div class="flex flex-wrap gap-7 justify-center px-4 pt-9">
          <img
            v-for="(_, key) in badgesInfo"
            :key="key"
            :src="`/src/assets/images/sprites/quiz/quiz_${key}-badge.png`"
            width="150px"
            class="transition-all duration-300"
            :class="{
              'opacity-100 scale-105': detailBadgeId === key,
              'opacity-60': detailBadgeId && detailBadgeId !== key
            }"
            @click="selectBadge(key)"
          />
        </div>
      </BaseImg>

      <div v-if="detailBadge" class="text-center w-full absolute bottom-8 px-20">
        <h4 class="font-bungee text-[#999999] text-5xl mb-2">{{ detailBadge.title }}</h4>
        <p class="font-exo-medium text-3xl text-[#999999] mb-4 px-24">
          {{ detailBadge.description }}
        </p>
        <BaseButton
          name="btn-action-orange"
          width="300px"
          @click="navigateToChallenge(detailBadge.id)"
        >
          {{ detailBadge.finished ? 'Recomeçar' : 'Começar' }}
        </BaseButton>
      </div>
      <div v-else class="text-center w-full absolute bottom-24 px-20">
        <h4 class="font-bungee text-[#3E6DAC] text-4xl mb-2">Escolha outro amigo do futuro!</h4>
        <p class="font-exo-medium text-2xl text-gray-700">Clique no amigo que quer ajudar agora.</p>
      </div>
    </BaseImg>
  </div>
</template>
