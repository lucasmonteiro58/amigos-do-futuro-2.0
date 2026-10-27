// What is downloaded on the loading screen, what is downloaded in the background afterwards,
// and what each route needs downloaded and decoded before it opens. Videos and voice lines
// never hold a route back: they can start playing while they stream.
import sheet0 from '@/assets/images/generated-sprites/spritesheet0.webp'
import sheet1 from '@/assets/images/generated-sprites/spritesheet1.webp'
import sheet2 from '@/assets/images/generated-sprites/spritesheet2.webp'
import sheet3 from '@/assets/images/generated-sprites/spritesheet3.webp'
import sheet4 from '@/assets/images/generated-sprites/spritesheet4.webp'
import sheet5 from '@/assets/images/generated-sprites/spritesheet5.webp'
import sheet6 from '@/assets/images/generated-sprites/spritesheet6.webp'
import sheet7 from '@/assets/images/generated-sprites/spritesheet7.webp'
import sheet8 from '@/assets/images/generated-sprites/spritesheet8.webp'
import sheet9 from '@/assets/images/generated-sprites/spritesheet9.webp'
import sheet10 from '@/assets/images/generated-sprites/spritesheet10.webp'

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

const routeSheets = {
  map: [sheet2],
  quiz: [sheet3],
  'quiz-result': [sheet3],
  certificate: [sheet3]
}

const routeAnimations = {
  form: [robotOrange],
  quiz: [robotOrange],
  feedback: [robotOrange],
  'eco-2': [eduMachine, lazMachine, sauMachine],
  'gov-3': [radioTower],
  'ino-1': [drinkingFountain],
  'mei-3': [pipes, faucet],
  'sau-2': [seesaw, toboggan, smartphone, ball, rocking]
}

const routeImages = {
  certificate: extraImages
}

const image = (url) => ({ type: 'image', url })
const media = (url) => ({ type: 'media', url })
const audio = (group) => ({ type: 'audio', group })

/** Blocks the loading screen: what the home screen and every screen after it need. */
export const criticalAssets = [
  ...[sheet0, sheet1].map(image),
  ...[robotBlue, robotFull, counter, cursorDrag, cursorClick, cursorKeyboard].map(image),
  audio('effects')
]

/** Decoded once on the loading screen and kept decoded: used on almost every screen. */
export const globalDecode = {
  sheets: [sheet0, sheet1],
  animations: [robotBlue, robotFull, counter, cursorDrag, cursorClick, cursorKeyboard]
}

/** Downloaded after the loading screen, roughly in the order the player reaches them. */
export const backgroundAssets = [
  media(startCutscene),
  audio('lines'),
  image(robotOrange),
  image(sheet2),
  image(sheet3),
  ...['eco', 'edu', 'gov', 'ino', 'laz', 'mei', 'sau'].flatMap((challenge) => [
    ...challengeSheets[challenge].map(image),
    ...Object.entries(routeAnimations)
      .filter(([name]) => name.startsWith(`${challenge}-`))
      .flatMap(([, animations]) => animations.map(image))
  ]),
  media(rocketLaunch),
  media(finalCutscene),
  ...extraImages.map(image),
  // the music Howl streams it from its own url, so this only fills the HTTP cache
  { type: 'warm', url: background }
]

/** What `route` needs downloaded, and what it needs decoded on top of `globalDecode`. */
export function routeNeeds(route) {
  const challenge = route.meta?.challenge || route.params?.challenge
  const sheets = [...(routeSheets[route.name] || []), ...(challengeSheets[challenge] || [])]
  const animations = routeAnimations[route.name] || []
  return {
    assets: [
      ...sheets.map(image),
      ...animations.map(image),
      ...(routeImages[route.name] || []).map(image)
    ],
    decode: { sheets, animations }
  }
}
