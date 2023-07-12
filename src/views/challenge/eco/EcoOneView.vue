<script setup>
import robotImage from '@/assets/images/sprites/economia/planta_cabeca_robo.png'
import { balls } from './consts'

const robot = new Image()
robot.src = robotImage

const showCursorKeyboard = ref(true)
const canvasRef = ref(null)
const canvasWidth = 1227
const canvasHeight = 850
const ctx = computed(() => canvasRef.value?.getContext('2d'))
const x = ref(600)
const y = ref(750)
const allBalls = ref(balls)

function draw() {
  ctx.value?.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.value?.drawImage(robot, x.value, y.value)
  allBalls.value.forEach((el) => {
    if (el.colided) return
    drawBall(el)
  })
}

function drawBall(ball) {
  const ballImage = new Image()
  ballImage.src = ball.img
  ctx.value?.drawImage(ballImage, ball.x, ball.y)
  ball.y += Math.sin(Date.now() / 1000) * 0.25
  checkCollision(ball)
}

function handleKeyDown(event) {
  const { keyCode } = event
  showCursorKeyboard.value = false
  if (keyCode === 37 && x.value > 0) {
    x.value -= 10
  } else if (keyCode === 38 && y.value > 0) {
    y.value -= 10
  } else if (keyCode === 39 && x.value < canvasWidth - 97) {
    x.value += 10
  } else if (keyCode === 40 && y.value < canvasHeight - 100) {
    y.value += 10
  }
  draw()
}

function checkCollision(ball) {
  const robotWidth = robot.width
  const robotHeight = robot.height
  const ballWidth = 101
  const ballHeight = 101

  if (
    x.value < ball.x + ballWidth &&
    x.value + robotWidth > ball.x &&
    y.value < ball.y + ballHeight &&
    y.value + robotHeight > ball.y
  ) {
    allBalls.value = allBalls.value.map((el) => {
      if (el.text === ball.text) return { ...el, colided: true }
      else return el
    })
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  setInterval(draw, 24)
})
</script>

<template>
  <main class="spritesheet bg_fundo_economia1 flex justify-center items-center flex-col">
    <BaseImg img="planta_plantacasa_eco" class="ml-8">
      <canvas
        ref="canvasRef"
        :width="canvasWidth"
        :height="canvasHeight"
        class="absolute top-[25px] left-[68px]"
      ></canvas>
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
    <CursorKeyboard
      v-if="showCursorKeyboard"
      class="absolute scale-[2] opacity-70"
    ></CursorKeyboard>
  </main>
</template>
