<script setup>
import { elementsOne as elements } from './consts'

const droppeds = ref([])

function verifyDropped(name) {
  return droppeds.value.includes(name)
}

function onDrop(el) {
  const { dataTransfer } = el
  droppeds.value.push(dataTransfer)
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
    <DropElement
      :expected="['children-red-1', 'children-red-2', 'children-red-3']"
      @dropped="onDrop"
      class="absolute w-[700px] h-[520px] top-[480px] left-[240px] bg-red-50"
    >
    </DropElement>
    <DropElement
      :expected="['children-yellow-1', 'children-yellow-2', 'children-yellow-3']"
      @dropped="onDrop"
      class="absolute w-[700px] h-[520px] top-[480px] left-[960px] bg-red-50"
    >
    </DropElement>
    <SpeechBubble
      title="Hora de brincar!"
      description="Você pode ser líder no parquinho e organizar as brincadeiras. Comece separando os times."
      audio="gov_help0"
      :time="8300"
    />
  </main>
</template>
