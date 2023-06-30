<script setup>
import { moveLeftKeyboard, moveUpKeyboard, moveRightKeyboard, moveDownKeyboard } from '@/utils'

const moveRef = ref(null)
const containerRef = ref(null)

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

function handleKeyDown(event) {
  const { keyCode } = event
  const element = moveRef.value
  const containerElement = containerRef.value

  if (element && containerElement) {
    const currentPosition = {
      left: element.offsetLeft,
      top: element.offsetTop
    }

    switch (keyCode) {
      case 37:
        moveLeftKeyboard(currentPosition, containerElement)
        break
      case 38:
        moveUpKeyboard(currentPosition, containerElement)
        break
      case 39:
        moveRightKeyboard(currentPosition, element, containerElement)
        break
      case 40:
        moveDownKeyboard(currentPosition, element, containerElement)
        break
      default:
        return
    }

    updateElementPosition(element, currentPosition)
  }
}

function updateElementPosition(element, currentPosition) {
  element.style.left = `${currentPosition.left}px`
  element.style.top = `${currentPosition.top}px`
}
</script>

<template>
  <main class="spritesheet bg_fundo_economia1 flex justify-center items-center flex-col">
    <BaseImg img="planta_plantacasa_eco" class="ml-8">
      <div ref="containerRef" class="w-[1227px] h-[850px] absolute top-[25px] left-[68px]">
        <div ref="moveRef" class="absolute top-[750px] left-[600px]">
          <BaseImg img="planta_cabeca_robo"></BaseImg>
        </div>
      </div>
    </BaseImg>
    <BaseImg img="planta_rectmoeda_menor" class="mr-[600px] relative scale-125">
      <BaseImg img="planta_moeda_eco" class="absolute top-2 left-2"></BaseImg>
      <div class="font-norwester text-5xl pt-2 pl-[6rem]">0</div>
    </BaseImg>
    <SpeechBubble
      title="Cofrinho cheio! Quanto dinheiro você consegue juntar?"
      description="Pegue as moedas verdes e fuja das vermelhas. Use as setas do teclado."
      audio="eco_help0"
      :time="9000"
    ></SpeechBubble>
    <CursorKeyboard class="absolute scale-[2] opacity-70"></CursorKeyboard>
  </main>
</template>
