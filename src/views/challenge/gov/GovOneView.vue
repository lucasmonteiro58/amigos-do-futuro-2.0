<script setup>
import { elementsOne as elements } from './consts'

const droppeds = ref([])
const redFlagAnimating = ref(false)
const yellowFlagAnimating = ref(false)

const droppedsElements = computed(() =>
  droppeds.value.map((name) => elements.find((el) => el.name === name))
)

function verifyDropped(name) {
  return droppeds.value.includes(name)
}

function animateFlag(flagRef) {
  flagRef.value = false
  nextTick(() => {
    flagRef.value = true
    setTimeout(() => {
      flagRef.value = false
    }, 1500)
  })
}

const { complete } = useComplete()

function onDrop(el) {
  const { dataTransfer } = el
  droppeds.value.push(dataTransfer)

  const droppedElement = elements.find((element) => element.name === dataTransfer)

  if (droppedElement?.type === 'red') {
    animateFlag(redFlagAnimating)
  } else if (droppedElement?.type === 'yellow') {
    animateFlag(yellowFlagAnimating)
  }

  if (droppeds.value.length === elements.length) {
    complete()
  }
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenario1_governo">
    <BaseImg img="campinho_campinho" class="absolute top-[464px]" />
    <DragElement
      v-for="el in elements"
      :key="el.name"
      :style="{ bottom: el.bottom, left: el.left }"
      :dataTransfer="el.name"
      :class="verifyDropped(el.name) ? 'hidden' : ''"
    >
      <div class="spritesheet" :class="el.image"></div>
    </DragElement>

    <BaseImg
      v-for="(dropped, index) in droppedsElements"
      :key="index"
      :img="dropped.image"
      :style="{ bottom: dropped.droppedBottom, left: dropped.droppedLeft }"
      class="absolute"
    />

    <DropElement
      :expected="['children-red-1', 'children-red-2', 'children-red-3']"
      @dropped="onDrop"
      class="absolute w-[700px] h-[520px] top-[480px] left-[240px]"
    >
    </DropElement>
    <DropElement
      :expected="['children-yellow-1', 'children-yellow-2', 'children-yellow-3']"
      @dropped="onDrop"
      class="absolute w-[700px] h-[520px] top-[480px] left-[960px]"
    >
    </DropElement>

    <BaseImg
      img="campinho_bandeira_vermelha"
      class="absolute left-[50px] bottom-[302px]"
      :class="{ animation__flagWave: redFlagAnimating }"
    />
    <BaseImg
      img="campinho_bandeira_amarela"
      class="absolute left-[1680px] bottom-[302px]"
      :class="{ animation__flagWave: yellowFlagAnimating }"
    />

    <SpeechBubble
      title="Hora de brincar!"
      description="Você pode ser líder no parquinho e organizar as brincadeiras. Comece separando os times."
      audio="gov_help0"
      :time="8300"
    />
  </main>
</template>
