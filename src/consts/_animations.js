import robotBlueImg from '@/assets/animations/robot/blue/sprite.png'
import robotBlueJson from '@/assets/animations/robot/blue/sprite.json'
import robotOrangeImg from '@/assets/animations/robot/orange/sprite.png'
import robotOrangeJson from '@/assets/animations/robot/orange/sprite.json'
import robotFullImg from '@/assets/animations/robot/full/sprite.png'
import robotFullJson from '@/assets/animations/robot/full/sprite.json'
import counterImg from '@/assets/animations/counter/sprite.png'
import counterJson from '@/assets/animations/counter/sprite.json'

const imageRobotBlue = new Image()
const imageRobotOrange = new Image()
const imageRobotFull = new Image()
const imageCounter = new Image()

imageRobotBlue.src = robotBlueImg
imageRobotOrange.src = robotOrangeImg
imageRobotFull.src = robotFullImg
imageCounter.src = counterImg

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

export { robotBlue, robotOrange, robotFull, counterAnimation }
