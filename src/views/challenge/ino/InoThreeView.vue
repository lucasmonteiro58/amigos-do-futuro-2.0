<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useEffectsStore } from '@/stores/effects'
import Popper from 'vue3-popper'
import ModalAtention from '@/components/layout/ModalAtention.vue'

const router = useRouter()
const effectsStore = useEffectsStore()

const isCompleted = ref(false)
const showHint = ref(true)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const infoText = ref('INFORMAÇÃO SOBRE A PEÇA')

const pieces = ref([
  {
    id: 'roda',
    name: 'Rodas',
    info: 'PERMITE QUE O CARRINHO ANDE',
    inside: false,
    spriteOutside: 'carrinho_rodas_foracarro',
    spriteInside: 'carrinho_roda_carro',
    styleOutside: { top: '2%', left: '25%', width: '8.5%' },
    styleInside: { top: '49%', left: '34%', width: '14%' }
  },
  {
    id: 'motor',
    name: 'Motor',
    info: 'AJUDA AS RODAS GIRAREM',
    inside: false,
    spriteOutside: 'carrinho_motor_foracarro',
    spriteInside: 'carrinho_motor_carro',
    styleOutside: { top: '2%', left: '36%', width: '10%' },
    styleInside: { top: '30%', left: '38%', width: '9%' }
  },
  {
    id: 'placa',
    name: 'Placa',
    info: 'GUARDA OS CÓDIGOS QUE FAZEM O CARRINHO ANDAR',
    inside: false,
    spriteOutside: 'carrinho_placa_foracarro',
    spriteInside: 'carrinho_placa_carro',
    styleOutside: { top: '2.5%', left: '48%', width: '9.5%' },
    styleInside: { top: '48.5%', left: '53%', width: '9.5%' }
  },
  {
    id: 'leds',
    name: 'LEDs',
    info: 'ADICIONA LUZES AO CARRINHO',
    inside: false,
    spriteOutside: 'carrinho_led_foracarro',
    spriteInside: 'carrinho_leds_carro',
    styleOutside: { top: '2%', left: '60%', width: '4.5%' },
    styleInside: { top: '45%', left: '55%', width: '13.5%' }
  },
  {
    id: 'sensorprox',
    name: 'Sensor de Proximidade',
    info: 'RECONHECE UMA COR',
    inside: false,
    spriteOutside: 'carrinho_sensorprox_foracarro',
    spriteInside: 'carrinho_sensorprox_carro',
    styleOutside: { top: '6.2%', left: '66.5%', width: '8%' },
    styleInside: { top: '48.2%', left: '41.5%', width: '17%' }
  }
])

function togglePiece(piece) {
  showHint.value = false
  effectsStore.playAudio('feedback_botao_01')
  piece.inside = !piece.inside
}

function onHover(piece) {
  infoText.value = piece.info
}

function onLeave() {
  infoText.value = 'INFORMAÇÃO SOBRE A PEÇA'
}

function checkCompletion() {
  const allInside = pieces.value.every((p) => p.inside)
  if (allInside) {
    isCompleted.value = true
    showSuccessModal.value = true
    effectsStore.playAudio('feedback_sucesso_geral')
  } else {
    showErrorModal.value = true
    effectsStore.playAudio('feedback_error')
  }
}

function closeErrorModal() {
  showErrorModal.value = false
}

function finishLevel() {
  router.push({
    name: 'congratulation',
    params: { challenge: 'ino', level: 3 }
  })
}
</script>

<template>
  <main
    class="flex flex-col items-center justify-center spritesheet cenariocarrinho_inovacao relative w-full h-full"
  >
    <BaseImg img="carrinho_cxapecas_up" class="absolute top-[0%] left-[22.5%] w-[55%]" />
    <BaseImg img="carrinho_cxadescricao_down" class="absolute bottom-[0%] left-[22.5%] w-[55%]" />

    <div
      class="absolute bottom-[5%] left-[24%] w-[52%] text-center font-exo"
      :class="
        infoText === 'INFORMAÇÃO SOBRE A PEÇA'
          ? 'text-gray-500 opacity-40 text-5xl'
          : 'text-primary-blue-text opacity-100 text-4xl'
      "
    >
      {{ infoText }}
    </div>

    <BaseImg img="carrinho_carro" class="absolute top-[32%] left-[34%] w-[36%] z-[5]" />

    <template v-for="piece in pieces" :key="piece.id + '_inside'">
      <BaseImg
        v-if="piece.inside"
        :img="piece.spriteInside"
        class="absolute cursor-pointer hover:scale-105 transition-transform"
        :class="piece.id === 'sensorprox' ? 'z-[2]' : 'z-[5]'"
        :style="piece.styleInside"
        @click="togglePiece(piece)"
      />
    </template>

    <template v-for="piece in pieces" :key="piece.id + '_outside'">
      <BaseImg
        :img="piece.spriteOutside"
        class="absolute cursor-pointer hover:scale-110 transition-transform"
        :style="piece.styleOutside"
        @click="togglePiece(piece)"
        @mouseenter="onHover(piece)"
        @mouseleave="onLeave"
      />
    </template>

    <BaseButton
      name="btn-toggle-next"
      class="absolute right-[5%] top-[50%] transform"
      @click="checkCompletion"
    />

    <div class="absolute top-[3%] left-[2%]">
      <Popper placement="bottom-start" offsetDistance="20" locked hover>
        <template #content>
          <div class="w-[400px] rounded-md mb-4">
            <div class="text-4xl font-bold pb-2 bg-gray-200 px-4 py-2">Saiba Mais</div>
            <div class="text-3xl px-4 py-2 bg-white">
              Em 2018, 50 equipes cearenses de várias escolas participaram da olimpíada nacional de
              robótica.
            </div>
          </div>
        </template>
        <BaseButton name="btn-toggle-info" width="90px"></BaseButton>
      </Popper>
    </div>

    <!-- Success Modal -->
    <ModalAtention v-model="showSuccessModal" isCustom>
      <div class="relative spritesheet carrinho_cxafeedback p-5">
        <BaseImg img="carrinho_pista_placeholder" class="w-full" />
        <div
          class="absolute bottom-[20%] right-[5%] w-[40%] text-right text-[#3E9E74] font-exo-bold text-6xl leading-tight font-bold"
        >
          SEU<br />CARRO<br />FUNCIONA!
        </div>
        <BaseButton
          name="btn-toggle-ok"
          class="absolute right-[-2%] top-[-2%]"
          width="140px"
          @click="finishLevel"
        />
      </div>
    </ModalAtention>

    <!-- Error Modal -->
    <ModalAtention v-model="showErrorModal" isCustom @close="closeErrorModal">
      <div class="relative spritesheet carrinho_cxafeedback p-5">
        <BaseImg img="carrinho_pista_placeholder" class="w-full" />
        <div
          class="absolute bottom-[20%] right-[5%] w-[40%] text-right text-[#DA2E27] font-exo-bold text-6xl leading-tight font-bold"
        >
          TENTE<br />OUTRAS<br />PEÇAS!
        </div>
        <BaseButton
          name="btn-toggle-close"
          class="absolute right-[-2%] top-[-2%]"
          width="140px"
          @click="closeErrorModal"
        />
      </div>
    </ModalAtention>

    <CursorClick v-if="showHint" class="absolute top-[10%] left-[30%]" />

    <SpeechBubble
      title="Seguindo o caminho!"
      description="Adicione peças ao carrinho para que ele consiga andar."
      audio="ino_help2"
      :time="6000"
    />
  </main>
</template>
