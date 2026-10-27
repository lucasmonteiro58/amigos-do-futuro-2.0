// What has to be downloaded on the loading screen and what has to be decoded before each route.
import sheet0 from '@/assets/images/generated-sprites/spritesheet0.png'
import sheet1 from '@/assets/images/generated-sprites/spritesheet1.png'
import sheet2 from '@/assets/images/generated-sprites/spritesheet2.png'
import sheet3 from '@/assets/images/generated-sprites/spritesheet3.png'
import sheet4 from '@/assets/images/generated-sprites/spritesheet4.png'
import sheet5 from '@/assets/images/generated-sprites/spritesheet5.png'
import sheet6 from '@/assets/images/generated-sprites/spritesheet6.png'
import sheet7 from '@/assets/images/generated-sprites/spritesheet7.png'
import sheet8 from '@/assets/images/generated-sprites/spritesheet8.png'
import sheet9 from '@/assets/images/generated-sprites/spritesheet9.png'
import sheet10 from '@/assets/images/generated-sprites/spritesheet10.png'

import robotBlue from '@/assets/animations/robot/blue/sprite.png'
import robotOrange from '@/assets/animations/robot/orange/sprite.png'
import robotFull from '@/assets/animations/robot/full/sprite.png'
import counter from '@/assets/animations/counter/sprite.png'
import cursorDrag from '@/assets/animations/cursor-drag/sprite.png'
import cursorClick from '@/assets/animations/cursor-click/sprite.png'
import cursorKeyboard from '@/assets/animations/cursor-keyboard/sprite.png'
import radioTower from '@/assets/animations/radio-antenna/sprite.png'
import drinkingFountain from '@/assets/animations/drinking-fountain/sprite.png'
import pipes from '@/assets/animations/pipes/sprite.png'
import faucet from '@/assets/animations/faucet/sprite.png'
import seesaw from '@/assets/animations/seesaw/sprite.png'
import toboggan from '@/assets/animations/toboggan/sprite.png'
import smartphone from '@/assets/animations/smartphone/sprite.png'
import ball from '@/assets/animations/ball/sprite.png'
import rocking from '@/assets/animations/rocking/sprite.png'
import eduMachine from '@/assets/animations/machine-educacao/sprite.png'
import lazMachine from '@/assets/animations/machine-lazer/sprite.png'
import sauMachine from '@/assets/animations/machine-saude/sprite.png'

import startCutscene from '@/assets/video/start-cutscene.mp4'
import finalCutscene from '@/assets/video/final-cutscene.mp4'
import rocketLaunch from '@/assets/video/rocket-launch.mp4'
import background from '@/assets/audios/background.mp3'

const extraImages = Object.values(
  import.meta.glob(
    ['@/assets/images/cards/*.png', '@/assets/images/sprites/quiz/quiz_*-badge.png'],
    { eager: true, import: 'default' }
  )
)

const challengeSheets = {
  eco: [sheet4],
  edu: [sheet5],
  gov: [sheet6],
  ino: [sheet7],
  laz: [sheet8],
  mei: [sheet9],
  sau: [sheet10]
}

/** Downloaded on the loading screen and kept in memory as blob urls. */
export const preloadMedia = [startCutscene, finalCutscene, rocketLaunch, background]

/** Every image the app shows. All are downloaded on the loading screen. */
export const preloadImages = [
  sheet0,
  sheet1,
  sheet2,
  sheet3,
  ...Object.values(challengeSheets).flat(),
  robotBlue,
  robotOrange,
  robotFull,
  counter,
  cursorDrag,
  cursorClick,
  cursorKeyboard,
  radioTower,
  drinkingFountain,
  pipes,
  faucet,
  seesaw,
  toboggan,
  smartphone,
  ball,
  rocking,
  eduMachine,
  lazMachine,
  sauMachine,
  ...extraImages
]

/** Decoded once on the loading screen and kept decoded: used on almost every screen. */
export const globalDecode = {
  sheets: [sheet0, sheet1],
  animations: [robotBlue, robotOrange, robotFull, counter, cursorDrag, cursorClick, cursorKeyboard]
}

const routeSheets = {
  map: [sheet2],
  quiz: [sheet3],
  'quiz-result': [sheet3],
  certificate: [sheet3]
}

const routeAnimations = {
  'eco-2': [eduMachine, lazMachine, sauMachine],
  'gov-3': [radioTower],
  'ino-1': [drinkingFountain],
  'mei-3': [pipes, faucet],
  'sau-2': [seesaw, toboggan, smartphone, ball, rocking]
}

/** Images to decode right before entering `route`, on top of `globalDecode`. */
export function routeDecode(route) {
  const challenge = route.meta?.challenge || route.params?.challenge
  return {
    sheets: [...(routeSheets[route.name] || []), ...(challengeSheets[challenge] || [])],
    animations: routeAnimations[route.name] || []
  }
}
