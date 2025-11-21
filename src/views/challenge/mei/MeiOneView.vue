<script setup>
import Popper from 'vue3-popper'

const router = useRouter()
const effectsStore = useEffectsStore()

const showHint = ref(true)
const isCompleted = ref(false)
const droppedCount = ref(0)

// Itens arrastáveis
const draggableItems = [
  {
    name: 'papel1',
    sprite: 'sustent_caixa',
    type: 'papel',
    top: '605px',
    left: '173px',
    tooltip: {
      title: 'Caixas de Papelão',
      content: '6 meses para desaparecer'
    }
  },
  {
    name: 'papel2',
    sprite: 'sustent_jornal1',
    type: 'papel',
    top: '648px',
    left: '1152px',
    tooltip: {
      title: 'Jornais',
      content: '3 meses para desaparecer'
    }
  },
  {
    name: 'metal1',
    sprite: 'sustent_refrigerante',
    type: 'metal',
    top: '756px',
    left: '1728px',
    tooltip: {
      title: 'Lata de refrigerante',
      content: '100 anos para desaparecer'
    }
  },
  {
    name: 'metal2',
    sprite: 'sustent_lata',
    type: 'metal',
    top: '594px',
    left: '1690px',
    tooltip: {
      title: 'Lata de ervilhas',
      content: '100 anos para desaparecer'
    }
  },
  {
    name: 'plastico1',
    sprite: 'sustent_garrafa',
    type: 'plastico',
    top: '648px',
    left: '672px',
    tooltip: {
      title: 'Garrafas plásticas',
      content: '450 anos para desaparecer'
    }
  },
  {
    name: 'plastico2',
    sprite: 'sustent_sacola2',
    type: 'plastico',
    top: '594px',
    left: '1498px',
    tooltip: {
      title: 'Sacos plásticos de mercantil',
      content: '30 anos para desaparecer'
    }
  },
  {
    name: 'vidro1',
    sprite: 'sustent_taca',
    type: 'vidro',
    top: '648px',
    left: '960px',
    tooltip: {
      title: 'Taça de vidro',
      content: 'Um milhão de anos para desaparecer'
    }
  },
  {
    name: 'vidro2',
    sprite: 'sustent_pote',
    type: 'vidro',
    top: '594px',
    left: '538px',
    tooltip: {
      title: 'Pote de vidro',
      content: 'Um milhão de anos para desaparecer'
    }
  },
  {
    name: 'organico1',
    sprite: 'sustent_maca',
    type: 'organico',
    top: '562px',
    left: '960px',
    tooltip: {
      title: 'Resto de fruta',
      content: '1 a 3 meses para desaparecer'
    }
  },
  {
    name: 'organico2',
    sprite: 'sustent_chiclete',
    type: 'organico',
    top: '832px',
    left: '58px',
    tooltip: {
      title: 'Chiclete',
      content: '5 anos para desaparecer'
    }
  }
]

// Lixeiras
const trashBins = [
  {
    type: 'metal',
    closedSprite: 'sustent_lixeirametal_fechada',
    openSprite: 'sustent_lixeirametal_aberta',
    top: '864px',
    left: '230px',
    openTop: '760px',
    accepts: ['metal1', 'metal2']
  },
  {
    type: 'papel',
    closedSprite: 'sustent_lixeirapapel_fechada',
    openSprite: 'sustent_lixeirapapel_aberta',
    top: '864px',
    left: '518px',
    openTop: '760px',
    accepts: ['papel1', 'papel2']
  },
  {
    type: 'plastico',
    closedSprite: 'sustent_lixeiraplastico_fechada',
    openSprite: 'sustent_lixeiraplastico_aberta',
    top: '864px',
    left: '806px',
    openTop: '760px',
    accepts: ['plastico1', 'plastico2']
  },
  {
    type: 'vidro',
    closedSprite: 'sustent_lixeiravidro_fechada',
    openSprite: 'sustent_lixeiravidro_aberta',
    top: '864px',
    left: '1094px',
    openTop: '760px',
    accepts: ['vidro1', 'vidro2']
  },
  {
    type: 'organico',
    closedSprite: 'sustent_lixeiraorganico_fechada',
    openSprite: 'sustent_lixeiraorganico_aberta',
    top: '864px',
    left: '1382px',
    openTop: '760px',
    accepts: ['organico1', 'organico2']
  }
]

// Itens já soltos (para esconder)
const droppedItems = ref([])

function isDropped(itemName) {
  return droppedItems.value.includes(itemName)
}

function onDragStart() {
  showHint.value = false
}

function onDrop(el) {
  const { dataTransfer } = el

  // Encontrar a lixeira que aceita este item
  const trashBin = trashBins.find((bin) => bin.accepts.includes(dataTransfer))

  if (trashBin) {
    // Item correto
    droppedItems.value.push(dataTransfer)
    droppedCount.value++

    effectsStore.playAudio('feedback_botao_01')

    // Verificar se completou (10 itens)
    if (droppedCount.value === 10) {
      isCompleted.value = true

      setTimeout(() => {
        router.push({
          name: 'congratulation',
          params: { challenge: 'mei', level: 1 }
        })
      }, 2000)
    }
  } else {
    // Item errado
    effectsStore.playAudio('feedback_mouse_over_itens')
  }
}
</script>

<template>
  <main class="flex flex-col justify-center items-center spritesheet bg-chao-sujo">
    <!-- Lixeiras fechadas -->
    <BaseImg
      v-for="bin in trashBins"
      :key="`closed-${bin.type}`"
      :img="bin.closedSprite"
      class="absolute"
      :style="{ top: bin.top, left: bin.left }"
    />

    <!-- Itens arrastáveis -->
    <template v-for="item in draggableItems" :key="item.name">
      <Popper
        v-if="!isDropped(item.name)"
        :placement="item.name.includes('1') ? 'right' : 'left'"
        offsetDistance="40"
        locked
        hover
      >
        <template #content>
          <div class="w-[400px] rounded-md">
            <div class="px-4 py-2 pb-2 text-3xl font-bold bg-gray-200 font-exo2">
              {{ item.tooltip.title }}
            </div>
            <div class="px-4 py-2 text-2xl font-exo2">
              {{ item.tooltip.content }}
            </div>
          </div>
        </template>
        <DragElement
          :dataTransfer="item.name"
          :style="{ top: item.top, left: item.left }"
          @start-drag="onDragStart"
          @mouseenter="effectsStore.playHoverButton()"
        >
          <div class="spritesheet" :class="item.sprite"></div>
        </DragElement>
      </Popper>
    </template>

    <!-- Zonas de drop -->
    <DropElement
      v-for="bin in trashBins"
      :key="`drop-${bin.type}`"
      :expected="bin.accepts"
      @dropped="onDrop"
      class="absolute w-[230px] h-[200px]"
      :style="{ top: bin.top, left: bin.left }"
    />

    <!-- Hint de arrastar -->
    <CursorDrag
      v-if="showHint"
      class="absolute top-[518px] left-[-135px] scale-[0.4] rotate-[30deg]"
      width="67%"
    />

    <!-- Speech Bubble -->
    <SpeechBubble
      title="Hora de limpar!"
      description="Transforme um terreno abandonado da sua cidade. Junte e separe o lixo."
      audio="mei_help0"
      :time="6531"
    />
  </main>
</template>
