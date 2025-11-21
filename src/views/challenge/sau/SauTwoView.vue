<script setup>
import { seesaw, toboggan, smartphone, ball, rocking } from '@/consts/_animations'

const router = useRouter()
const effectsStore = useEffectsStore()

const isCompleted = ref(false)
const showHint = ref(true)

// Estado dos elementos clicados
const escorregador = ref(false)
const campinho = ref(false)
const balanco = ref(false)
const gangorra = ref(false)
const tablet = ref(false)

// Energia inicial: 49.4%
// Meta: 66.6%
// Barra vai de 32.2% a 68.2% (36% de largura)
const bilotoPercentage = ref(49.4)
const targetPercentage = 66.6
const barStartPercentage = 32.2
const barEndPercentage = 68.2

// Refs para controlar animações
const refTobogganAnimation = ref(null)
const refBallAnimation = ref(null)
const refRockingAnimation = ref(null)
const refSeesawAnimation = ref(null)
const refSmartphoneAnimation = ref(null)

// Valores de incremento de energia (em porcentagem)
const energyIncrements = {
  escorregador: 4.8,
  campinho: 5.8,
  balanco: 2.8,
  gangorra: 3.8,
  tablet: 0
}

// Estado das animações
const showTobogganAnimation = ref(false)
const showBallAnimation = ref(false)
const showRockingAnimation = ref(false)
const showSeesawAnimation = ref(false)
const showSmartphoneAnimation = ref(false)

// Estado do campinho (com/sem bola)
const showCampinhoWithBall = ref(true)

function updateEnergy(element) {
  if (element === 'escorregador' && escorregador.value) return
  if (element === 'campinho' && campinho.value) return
  if (element === 'balanco' && balanco.value) return
  if (element === 'gangorra' && gangorra.value) return
  if (element === 'tablet' && tablet.value) return

  showHint.value = false

  const increment = energyIncrements[element]
  bilotoPercentage.value += increment

  bilotoPercentage.value = Math.max(
    barStartPercentage,
    Math.min(barEndPercentage, bilotoPercentage.value)
  )

  if (element === 'escorregador') {
    escorregador.value = true
    showTobogganAnimation.value = true
  } else if (element === 'campinho') {
    campinho.value = true
    showCampinhoWithBall.value = false
    showBallAnimation.value = true
  } else if (element === 'balanco') {
    balanco.value = true
    showRockingAnimation.value = true
  } else if (element === 'gangorra') {
    gangorra.value = true
    showSeesawAnimation.value = true
  } else if (element === 'tablet') {
    tablet.value = true
    showSmartphoneAnimation.value = true
  }

  effectsStore.playAudio('feedback_botao_01')
}

function handleNext() {
  if (Math.abs(bilotoPercentage.value - targetPercentage) < 0.1) {
    // Sucesso!
    isCompleted.value = true
    effectsStore.playAudio('sau_parabens2')

    router.push({
      name: 'congratulation',
      params: { challenge: 'sau', level: 2 }
    })
  } else {
    // Ainda não completou
    effectsStore.playAudio('feedback_mouse_over_itens')
    // Poderia mostrar um modal aqui
  }
}
</script>

<template>
  <main
    class="flex relative flex-col justify-center items-center w-full h-full spritesheet bg_parquinho_saude"
  >
    <!-- Elementos clicáveis do parquinho -->

    <!-- Escorregador (Toboggan) -->
    <BaseImg
      v-if="!showTobogganAnimation"
      img="parquinho_escorrega"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="escorregador ? 'opacity-50' : 'opacity-100'"
      :style="{ top: '281px', left: '96px', width: '403px' }"
      @click="updateEnergy('escorregador')"
    />

    <!-- Animação do Escorregador -->
    <BaseAnimation
      v-if="showTobogganAnimation"
      ref="refTobogganAnimation"
      :spritesheet="toboggan.sprite"
      :json="toboggan.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showTobogganAnimation = false"
      width="30%"
      class="absolute top-[281px] left-[96px]"
    />

    <!-- Campinho (Ball) -->
    <BaseImg
      v-if="!showBallAnimation && showCampinhoWithBall"
      img="parquinho_campinho"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="campinho ? 'opacity-50' : 'opacity-100'"
      :style="{ top: '346px', left: '614px', width: '710px' }"
      @click="updateEnergy('campinho')"
    />

    <!-- Animação do Campinho -->
    <BaseAnimation
      v-if="showBallAnimation"
      ref="refBallAnimation"
      :spritesheet="ball.sprite"
      :json="ball.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showBallAnimation = false"
      width="30%"
      class="absolute top-[346px] left-[614px]"
    />

    <!-- Balanço (Rocking) -->
    <BaseImg
      v-if="!showRockingAnimation"
      img="parquinho_balanco"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="balanco ? 'opacity-50' : 'opacity-100'"
      :style="{ top: '313px', left: '1421px', width: '422px' }"
      @click="updateEnergy('balanco')"
    />

    <!-- Animação do Balanço -->
    <BaseAnimation
      v-if="showRockingAnimation"
      ref="refRockingAnimation"
      :spritesheet="rocking.sprite"
      :json="rocking.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showRockingAnimation = false"
      width="43%"
      class="absolute top-[313px] left-[1421px] scale-[1.165]"
    />

    <!-- Gangorra (Seesaw) -->
    <BaseImg
      v-if="!showSeesawAnimation"
      img="parquinho_gangorra"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="gangorra ? 'opacity-50' : 'opacity-100'"
      :style="{ top: '508px', left: '634px', width: '614px' }"
      @click="updateEnergy('gangorra')"
    />

    <!-- Animação da Gangorra -->
    <BaseAnimation
      v-if="showSeesawAnimation"
      ref="refSeesawAnimation"
      :spritesheet="seesaw.sprite"
      :json="seesaw.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showSeesawAnimation = false"
      width="45%"
      class="absolute top-[508px] left-[634px]"
    />

    <!-- Tablet (Smartphone) -->
    <BaseImg
      v-if="!showSmartphoneAnimation"
      img="parquinho_tablet"
      class="absolute transition-opacity duration-300 cursor-pointer"
      :class="tablet ? 'opacity-50' : 'opacity-100'"
      :style="{ top: '778px', left: '1344px', width: '154px' }"
      @click="updateEnergy('tablet')"
    />

    <!-- Animação do Tablet -->
    <BaseAnimation
      v-if="showSmartphoneAnimation"
      ref="refSmartphoneAnimation"
      :spritesheet="smartphone.sprite"
      :json="smartphone.json"
      :fps="10"
      :isLoop="false"
      :autoplay="true"
      @animationOver="showSmartphoneAnimation = false"
      width="43%"
      class="absolute top-[778px] left-[1344px]"
    />

    <!-- Barra de Energia -->
    <BaseImg
      img="parquinho_barrasaude"
      class="absolute"
      :style="{ top: '972px', left: '618px', width: '691px' }"
    />

    <!-- Biloto (Indicador de Energia) -->
    <BaseImg
      img="parquinho_marcadorbarra_saude"
      class="absolute transition-all duration-[1300ms] ease-out"
      :style="{ top: '964px', left: `${bilotoPercentage * 19.2}px`, width: '29px' }"
    />

    <!-- Labels de Energia -->
    <BaseImg
      img="parquinho_cxa_muitaenergia"
      class="absolute"
      :style="{ top: '972px', left: '1325px', width: '234px' }"
    />
    <BaseImg
      img="parquinho_cxa_poucaenergia"
      class="absolute"
      :style="{ top: '972px', right: '1325px', width: '234px' }"
    />

    <!-- Hint de Cursor Click -->
    <CursorClick v-if="showHint" class="absolute top-[400px] left-[700px] opacity-70" />

    <!-- Botão Próximo -->
    <BaseButton
      name="btn-toggle-next"
      class="absolute bottom-[54px] right-[44px]"
      width="180px"
      @click="handleNext"
    />

    <!-- Speech Bubble -->
    <SpeechBubble
      title="Parquinho Saudável!"
      description="Clique nos brinquedos para aumentar a energia. Mas cuidado com o tablet!"
      audio="sau_help1"
      :time="7000"
    />
  </main>
</template>
