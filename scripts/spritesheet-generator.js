/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
const Spritesmith = require('spritesmith')
const glob = require('glob')

const inputDir = 'src/assets/images/sprites'
const outputDir = 'src/assets/images/'
const defaultClass = 'spritesheet'

deleteFiles(['src/assets/style/spritesheet.css', 'src/assets/images/spritesheet.png'])
generateSprite(inputDir, outputDir)

function deleteFiles(array) {
  array.forEach((item) => {
    fs.unlink(item, () => {})
  })
  console.log('--refreshed files')
}

function generateSprite(inputDir, outputDir) {
  const imageFiles = glob.sync(`${inputDir}/**/*.png`)

  if (imageFiles.length === 0) {
    console.error('--no images found')
    return
  }

  const spritesmithOptions = {
    src: imageFiles,
    algorithm: 'binary-tree',
    padding: 5,
    exportOpts: {
      quality: 75
    }
  }

  Spritesmith.run(spritesmithOptions, (err, result) => {
    if (err) {
      console.error('-- error: ', err)
      return
    }

    const spritePath = path.join(outputDir, 'spritesheet.png')
    fs.writeFileSync(spritePath, result.image)
    console.log('--spritesheet generated in: ', spritePath)

    const cssPath = 'src/assets/style/spritesheet.css'
    const spriteData = result.coordinates

    const cssContent = generateScssContent(spriteData)
    fs.writeFileSync(cssPath, cssContent)
    console.log('--css file generated in:', cssPath)
  })
}

function generateScssContent(spriteData) {
  let cssContent = ''

  for (const [filename, coordinates] of Object.entries(spriteData)) {
    const { x, y, width, height } = coordinates

    const className = path.basename(filename, path.extname(filename))
    cssContent += `.${defaultClass}.${className} {\n`
    cssContent += `  background-image: url('../images/spritesheet.png');\n`
    cssContent += `  background-position: -${x}px -${y}px;\n`
    cssContent += `  width: ${width}px;\n`
    cssContent += `  height: ${height}px;\n`
    cssContent += `}\n\n`
  }

  return cssContent
}
