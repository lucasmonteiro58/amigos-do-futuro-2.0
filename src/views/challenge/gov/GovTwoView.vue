<script setup>
import { elementsTwo as elements } from './consts'

const droppeds = ref([])
const showHelper = ref(true)

const droppedsElements = computed(() =>
  droppeds.value.map((name) => elements.find((el) => el.name === name))
)

function verifyDropped(name) {
  return droppeds.value.includes(name)
}

function onStartDrag() {
  if (showHelper.value) {
    showHelper.value = false
  }
}

const { complete } = useComplete()

function onDrop(el) {
  const { dataTransfer } = el
  droppeds.value.push(dataTransfer)

  if (droppeds.value.length === elements.length) {
    complete()
  }
}
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenariogoverno_ong">
    <SpeechBubble
      title="Ajude!"
      description="Receba as doações de alimento do bairro para ajudar a Associação."
      audio="gov_help1"
      :time="6700"
    />
    <BaseImg
      v-for="el in droppedsElements"
      :key="el.name"
      :img="el.droppedImage"
      :style="{ bottom: el.droppedBottom, left: el.droppedLeft }"
      class="absolute"
      :class="el.droppedClass"
    />
    <BaseImg img="ong_cesta_governo" class="absolute top-[723px] left-[1035px] z-[5]" />

    <CursorDrag v-if="showHelper" class="absolute bottom-[225px] left-[663px]" />
    <DragElement
      v-for="el in elements"
      :key="el.name"
      :style="{ bottom: el.bottom, left: el.left }"
      :dataTransfer="el.name"
      class="animation__float"
      :class="verifyDropped(el.name) ? 'hidden' : ''"
      @startDrag="onStartDrag"
    >
      <div class="spritesheet" :class="el.image"></div>
    </DragElement>
    <DropElement
      :expected="['alface', 'banana', 'cenoura', 'tomate']"
      @dropped="onDrop"
      class="absolute w-[250px] h-[200px] top-[654px] left-[1036px]"
    >
    </DropElement>
  </main>
</template>
