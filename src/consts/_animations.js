import robotBlueImg from '@/assets/animations/robot/blue/sprite.png'
import robotBlueJson from '@/assets/animations/robot/blue/sprite.json'
import robotOrangeImg from '@/assets/animations/robot/orange/sprite.png'
import robotOrangeJson from '@/assets/animations/robot/orange/sprite.json'
import robotFullImg from '@/assets/animations/robot/full/sprite.png'
import robotFullJson from '@/assets/animations/robot/full/sprite.json'
import counterImg from '@/assets/animations/counter/sprite.png'
import counterJson from '@/assets/animations/counter/sprite.json'
import cursorDragImg from '@/assets/animations/cursor-drag/sprite.png'
import cursorDragJson from '@/assets/animations/cursor-drag/sprite.json'
import cursorClickImg from '@/assets/animations/cursor-click/sprite.png'
import cursorClickJson from '@/assets/animations/cursor-click/sprite.json'

/* eco */
import cursorKeyboardImg from '@/assets/animations/cursor-keyboard/sprite.png'
import cursorKeyboardJson from '@/assets/animations/cursor-keyboard/sprite.json'

/* gov */
import radioTowerImg from '@/assets/animations/radio-antenna/sprite.png'
import radioTowerJson from '@/assets/animations/radio-antenna/sprite.json'

/* ino */
import drinkingFountainImg from '@/assets/animations/drinking-fountain/sprite.png'
import drinkingFountainJson from '@/assets/animations/drinking-fountain/sprite.json'
import rocketImg from '@/assets/animations/rocket/sprite.png'
import rocketJson from '@/assets/animations/rocket/sprite.json'

const imageRobotBlue = new Image()
const imageRobotOrange = new Image()
const imageRobotFull = new Image()
const imageCounter = new Image()
const imageCursorDrag = new Image()
const imageCursorKeyboard = new Image()
const imageCursorClick = new Image()
const imageRadioTower = new Image()
const imageDrinkingFountain = new Image()
const imageRocket = new Image()

imageRobotBlue.src = robotBlueImg
imageRobotOrange.src = robotOrangeImg
imageRobotFull.src = robotFullImg
imageCounter.src = counterImg
imageCursorDrag.src = cursorDragImg
imageCursorKeyboard.src = cursorKeyboardImg
imageCursorClick.src = cursorClickImg
imageRadioTower.src = radioTowerImg
imageDrinkingFountain.src = drinkingFountainImg
imageRocket.src = rocketImg

const robotBlue = {
  sprite: imageRobotBlue,
  json: robotBlueJson
}
const robotOrange = {
  sprite: imageRobotOrange,
  json: robotOrangeJson
}
const robotFull = {
  sprite: imageRobotFull,
  json: robotFullJson
}
const counterAnimation = {
  sprite: imageCounter,
  json: counterJson
}
const cursorDrag = {
  sprite: imageCursorDrag,
  json: cursorDragJson
}
const cursorKeyboard = {
  sprite: imageCursorKeyboard,
  json: cursorKeyboardJson
}
const cursorClick = {
  sprite: imageCursorClick,
  json: cursorClickJson
}

const radioTower = {
  sprite: imageRadioTower,
  json: radioTowerJson
}

const drinkingFountain = {
  sprite: imageDrinkingFountain,
  json: drinkingFountainJson
}

const rocket = {
  sprite: imageRocket,
  json: rocketJson
}

export {
  cursorDrag,
  robotBlue,
  robotOrange,
  robotFull,
  counterAnimation,
  cursorKeyboard,
  cursorClick,
  radioTower,
  drinkingFountain,
  rocket
}
