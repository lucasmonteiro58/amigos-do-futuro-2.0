<script setup>
import { elementsThree as elements } from './consts'

const droppeds = ref([])
const showHelper = ref(true)
const refRadioTower = ref(null)

const droppedsElements = computed(() =>
  droppeds.value.map((name) => elements.find((el) => el.name === name))
)

const router = useRouter()

function verifyDropped(name) {
  return droppeds.value.includes(name)
}

function onStartDrag() {
  if (showHelper.value) {
    showHelper.value = false
  }
}

function onDrop(el) {
  const { dataTransfer } = el
  droppeds.value.push(dataTransfer)
  refRadioTower.value.play()

  if (droppeds.value.length === elements.length) {
    setTimeout(() => {
      router.push({ name: 'congratulation', params: { challenge: 'gov', level: 3 } })
    }, 1000)
  }
}

onMounted(() => {
  refRadioTower.value.play()
})
</script>

<template>
  <main class="flex flex-col items-center justify-center spritesheet cenariogoverno_radio">
    <SpeechBubble
      title="Olá ouvintes!"
      description="Participe da rádio. Junte as notícias para o programa e deixe todo mundo informado."
      audio="gov_help2"
      :time="7500"
    />

    <BaseImg
      v-for="el in droppedsElements"
      :key="el.name"
      :img="el.droppedImage"
      :style="{ bottom: el.droppedBottom, left: el.droppedLeft }"
      class="absolute"
      :class="el.droppedClass"
    />
    <RadioTower ref="refRadioTower" class="absolute bottom-[300px] left-[380px]" />
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
      :expected="['jornal_1', 'jornal_2', 'jornal_3', 'jornal_4']"
      @dropped="onDrop"
      class="absolute w-[250px] h-[200px] top-[654px] left-[1036px]"
    >
    </DropElement>
  </main>
</template>
