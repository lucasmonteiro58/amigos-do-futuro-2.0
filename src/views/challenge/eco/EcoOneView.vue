<script setup>
import robotImage from '@/assets/images/sprites/economia/planta_cabeca_robo.png'
import { balls, walls } from './consts'

const robot = new Image()
robot.src = robotImage

// phones and tablets have no arrow keys, so they get arrow buttons on the screen
const isTouch = window.matchMedia('(pointer: coarse)').matches
const showCursorKeyboard = ref(!isTouch)
const canvasRef = ref(null)
const canvasWidth = 1227
const canvasHeight = 850
const ctx = computed(() => canvasRef.value?.getContext('2d'))
const x = ref(600)
const y = ref(750)
const allBalls = ref(balls)
const index = ref(0)
const total = ref(0)
const message = ref('')
const type = ref('')

const effectStore = useEffectsStore()

const SPEED = 300 // px per second, as fast as holding an arrow key used to be
const HITBOX_INSET = 10 // the robot head has some empty space around it
const held = reactive({ left: false, up: false, right: false, down: false })
const keys = { 37: 'left', 38: 'up', 39: 'right', 40: 'down' }

function hitsWall(left, top) {
  const right = left + robot.width - HITBOX_INSET
  const bottom = top + robot.height - HITBOX_INSET
  left += HITBOX_INSET
  top += HITBOX_INSET
  return walls.some((w) => left < w.x + w.w && right > w.x && top < w.y + w.h && bottom > w.y)
}

const CORNER_SLIDE = 30 // px the robot may be off a doorway and still slip through it

/**
 * Moves the robot `distance` px along one axis, stopping right at a wall or the canvas edge.
 * When a corner blocks it but a free path is at most CORNER_SLIDE px to the side, it slides
 * that way instead, so doorways don't need pixel perfect aiming.
 */
function moveAxis(axis, distance) {
  const maxX = canvasWidth - 97
  const maxY = canvasHeight - 100
  const [along, across] = axis === 'x' ? [x, y] : [y, x]
  const blocked = (a, b) => {
    const [left, top] = axis === 'x' ? [a, b] : [b, a]
    return left < 0 || left > maxX || top < 0 || top > maxY || hitsWall(left, top)
  }
  const step = Math.sign(distance)
  for (let moved = 0; moved < Math.abs(distance); moved++) {
    const next = along.value + step
    if (!blocked(next, across.value)) {
      along.value = next
      continue
    }
    const side = [...Array(CORNER_SLIDE)]
      .flatMap((_, i) => [i + 1, -(i + 1)])
      .find((offset) => !blocked(next, across.value + offset))
    if (!side || blocked(along.value, across.value + Math.sign(side))) return
    across.value += Math.sign(side)
  }
}

function move(seconds) {
  const distance = Math.round(SPEED * seconds)
  // each axis on its own, so walking diagonally into a wall slides along it
  if (held.left !== held.right) moveAxis('x', held.left ? -distance : distance)
  if (held.up !== held.down) moveAxis('y', held.up ? -distance : distance)
}

function draw() {
  ctx.value?.clearRect(0, 0, canvasWidth, canvasHeight)
  ctx.value?.drawImage(robot, x.value, y.value)
  allBalls.value.forEach((el) => {
    if (el.colided) return
    if (index.value >= el.stage) {
      drawBall(el)
    }
  })
}

// one Image per ball, created once: creating them on every frame made each draw wait on a new image
const ballImages = new Map(
  balls.map((ball) => {
    const image = new Image()
    image.src = ball.img
    return [ball.img, image]
  })
)

let frameScale = 1 // this frame's length compared to the 24ms frames the bobbing was tuned for

function drawBall(ball) {
  ctx.value?.drawImage(ballImages.get(ball.img), ball.x, ball.y)
  ball.y += Math.sin(Date.now() / 1000) * 0.25 * frameScale
  checkCollision(ball)
}

function handleKeyDown(event) {
  const direction = keys[event.keyCode]
  if (!direction) return
  event.preventDefault()
  showCursorKeyboard.value = false
  held[direction] = true
}

function handleKeyUp(event) {
  const direction = keys[event.keyCode]
  if (direction) held[direction] = false
}

function releaseAll() {
  Object.keys(held).forEach((direction) => (held[direction] = false))
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
      if (el.text === ball.text && ball.type === 'good') index.value++
      if (el.text === ball.text) {
        total.value += ball.value
        message.value = ball.text
        type.value = ball.type
        ball.type === 'good'
          ? effectStore.playAudio('feedback_economia_moeda_entrando')
          : effectStore.playAudio('feedback_economia_moeda_saindo')
        return { ...el, colided: true }
      } else return el
    })
  }
}

const { complete } = useComplete()

watchEffect(() => {
  if (index.value === 4) {
    complete()
  }
})

let frame = null
let lastTime = null

function loop(now) {
  // a long pause (e.g. a background tab) must not teleport the robot through a wall
  const seconds = lastTime === null ? 0 : Math.min((now - lastTime) / 1000, 0.1)
  lastTime = now
  frameScale = (seconds * 1000) / 24
  move(seconds)
  draw()
  frame = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
  window.addEventListener('blur', releaseAll)
  frame = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
  window.removeEventListener('blur', releaseAll)
  cancelAnimationFrame(frame)
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
    <div
      class="bg-[#e5e5e5] text-5xl font-front absolute px-[50px] pl-[100px] py-[19px] rounded-full bottom-[32px] left-[700px]"
      :class="type === 'good' ? 'text-green-500' : 'text-red-500'"
      v-if="message"
    >
      {{ message }}
    </div>
    <BaseImg img="planta_rectmoeda_menor" class="mr-[600px] relative scale-125">
      <BaseImg img="planta_moeda_eco" class="absolute top-2 left-2"></BaseImg>
      <div class="font-norwester text-5xl pt-2 pl-[6rem]">{{ total }}</div>
    </BaseImg>

    <SpeechBubble
      title="Cofrinho cheio! Quanto dinheiro você consegue juntar?"
      :description="`Pegue as moedas verdes e fuja das vermelhas. Use as setas ${
        isTouch ? 'da tela' : 'do teclado'
      }.`"
      audio="eco_help0"
      :time="9000"
    ></SpeechBubble>
    <!-- arrow pad for touch screens: hold an arrow to walk -->
    <div v-if="isTouch" class="arrow-pad absolute left-[50px] bottom-[60px]" @contextmenu.prevent>
      <BaseImg
        v-for="direction in ['up', 'left', 'right', 'down']"
        :key="direction"
        img="btn-toggle-next"
        width="130px"
        class="arrow-pad__button"
        :class="[`arrow-pad__button--${direction}`, { 'is-held': held[direction] }]"
        @pointerdown="held[direction] = true"
        @pointerup="held[direction] = false"
        @pointerleave="held[direction] = false"
        @pointercancel="held[direction] = false"
      ></BaseImg>
    </div>
    <CursorKeyboard
      v-if="showCursorKeyboard"
      class="absolute scale-[2] opacity-70"
    ></CursorKeyboard>
  </main>
</template>

<style scoped>
.arrow-pad {
  display: grid;
  grid-template-areas:
    '. up .'
    'left . right'
    '. down .';
  gap: 6px;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.arrow-pad__button {
  transition: transform 0.1s, filter 0.1s;
}

.arrow-pad__button.is-held {
  filter: saturate(60%) contrast(108%) grayscale(45%);
}

.arrow-pad__button--up {
  grid-area: up;
  transform: rotate(-90deg);
}
.arrow-pad__button--left {
  grid-area: left;
  transform: rotate(180deg);
}
.arrow-pad__button--right {
  grid-area: right;
}
.arrow-pad__button--down {
  grid-area: down;
  transform: rotate(90deg);
}
</style>
