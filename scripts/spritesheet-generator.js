/* eslint-disable no-undef */
const fs = require('fs')
const util = require('util')
const path = require('path')
const Spritesmith = require('spritesmith')
const glob = require('glob')

const defaultClass = 'spritesheet'
const outputDir = 'src/assets/images/generated-sprites'
const outputCssFile = 'src/assets/style/_spritesheet.css'

const sprites = [
  { id: 0, name: 'bg' },
  { id: 1, name: 'btn-badge-box' },
  { id: 2, name: 'mapa' },
  { id: 3, name: 'quiz' },
  { id: 4, name: 'economia' },
  { id: 5, name: 'educacao' },
  { id: 6, name: 'governo' },
  { id: 7, name: 'inovacao' },
  { id: 8, name: 'lazer' },
  { id: 9, name: 'meio' },
  { id: 10, name: 'saude' }
]

const unlink = util.promisify(fs.unlink)
const writeFile = util.promisify(fs.writeFile)

async function generateSprites() {
  console.log('🚀 Generating sprites...')
  for (const sprite of sprites) {
    console.log(`--------------------------------------------------------`)
    await deleteFiles(sprite.id)
    const inputDir = `src/assets/images/sprites/${sprite.name}`
    await generateSprite(inputDir, outputDir, sprite.id)
  }
}

async function deleteFiles(id) {
  const deleteArray = [
    `src/assets/images/generated-sprites/spritesheet${id}.png`,
    `src/assets/style/generated-sprites/spritesheet${id}.css`
  ]

  const deletePromises = deleteArray.map((item) => unlink(item))

  await Promise.all(deletePromises)
  console.log(`🔄 ID:${id}`)
}

async function generateSprite(inputDir, outputDir, id) {
  const imageFiles = glob.sync(`${inputDir}/**/*.png`)

  if (imageFiles.length === 0) {
    console.error('-- No images found')
    throw new Error('No images found')
  }

  const spritesmithOptions = {
    src: imageFiles,
    algorithm: 'binary-tree',
    padding: 5,
    exportOpts: {
      quality: 60
    }
  }

  const spritesmithRun = util.promisify(Spritesmith.run)
  const result = await spritesmithRun(spritesmithOptions)

  const spritePath = path.join(outputDir, `spritesheet${id}.png`)
  await writeFile(spritePath, result.image)
  console.log(`🖼️ Spritesheet ${id} generated in: ${spritePath}`)

  const cssPath = `src/assets/style/generated-sprites/spritesheet${id}.css`
  const spriteData = result.coordinates

  const cssContent = generateCssContent(spriteData, id)
  await writeFile(cssPath, cssContent)
  console.log(`✨ CSS file ${id} generated in: ${cssPath}`)

  const cssLocation = generateCssLocation(sprites)
  await writeFile(outputCssFile, cssLocation)
}

function generateCssContent(spriteData, id) {
  let cssContent = ''

  for (const [filename, coordinates] of Object.entries(spriteData)) {
    const { x, y, width, height } = coordinates
    const className = path.basename(filename, path.extname(filename))

    cssContent += `.${defaultClass}.${className} {\n`
    cssContent += `  background-image: url('../../images/generated-sprites/spritesheet${id}.png');\n`
    cssContent += `  background-position: -${x}px -${y}px;\n`
    cssContent += `  width: ${width}px;\n`
    cssContent += `  height: ${height}px;\n`
    cssContent += `}\n\n`
  }

  return cssContent
}

function generateCssLocation(sprite) {
  let cssContent = ''

  for (const item of sprite) {
    cssContent += `@import './generated-sprites/spritesheet${item.id}.css';\n`
  }

  return cssContent
}

generateSprites()
  .catch((error) => {
    console.error('-- Error:', error)
  })
  .finally(() => {
    console.log(`--------------------------------------------------------`)
    console.log('🎉 Finished!')
  })
