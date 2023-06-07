import fs from 'fs'

export default function (array) {
  array.forEach((item) => {
    fs.unlink(item, () => {})
  })
  console.log('Reseted files')
}
