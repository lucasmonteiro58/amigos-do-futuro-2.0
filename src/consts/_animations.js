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

const imageRobotBlue = new Image()
const imageRobotOrange = new Image()
const imageRobotFull = new Image()
const imageCounter = new Image()
const imageCursorDrag = new Image()

imageRobotBlue.src = robotBlueImg
imageRobotOrange.src = robotOrangeImg
imageRobotFull.src = robotFullImg
imageCounter.src = counterImg
imageCursorDrag.src = cursorDragImg

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

export { robotBlue, robotOrange, robotFull, counterAnimation, cursorDrag }
