/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
const Spritesmith = require('spritesmith')
const glob = require('glob')

// const inputDir = 'src/assets/images/sprites'
// const outputDir = 'src/assets/images/'
const defaultClass = 'spritesheet'
const outputDir = 'src/assets/images/'

const sprites = [
  {
    id: 0,
    name: 'bg'
  },
  {
    id: 1,
    name: 'btn-badge-box'
  },
  {
    id: 2,
    name: 'mapa'
  },
  {
    id: 3,
    name: 'quiz'
  },
  {
    id: 4,
    name: 'economia'
  },
  {
    id: 5,
    name: 'educacao'
  },
  {
    id: 6,
    name: 'governo'
  },
  {
    id: 7,
    name: 'inovacao'
  },
  {
    id: 8,
    name: 'lazer'
  },
  {
    id: 9,
    name: 'meio'
  },
  {
    id: 10,
    name: 'saude'
  }
]

sprites.forEach((sprite) => {
  deleteFiles(generateDeleteArray(), sprite.id)
  const inputDir = `src/assets/images/sprites/${sprite.name}`
  generateSprite(inputDir, outputDir, sprite.id)
})

function generateDeleteArray() {
  const deleteArray = []
  sprites.forEach((sprite) => {
    deleteArray.push(`src/assets/images/spritesheet${sprite.id}.png`)
    deleteArray.push(`src/assets/style/spritesheet${sprite.id}.css`)
  })
  return deleteArray
}

function deleteFiles(array, id) {
  array.forEach((item) => {
    fs.unlink(item, () => {})
  })
  console.log('--refreshed files: id:' + id)
}

function generateSprite(inputDir, outputDir, id) {
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
      quality: 60
    }
  }

  Spritesmith.run(spritesmithOptions, (err, result) => {
    if (err) {
      console.error('-- error: ', err)
      return
    }

    const spritePath = path.join(outputDir, `spritesheet${id}.png`)
    fs.writeFileSync(spritePath, result.image)
    console.log('--spritesheet ' + id + ' generated in: ', spritePath)

    const cssPath = `src/assets/style/spritesheet${id}.css`
    const spriteData = result.coordinates

    const cssContent = generateScssContent(spriteData, id)
    fs.writeFileSync(cssPath, cssContent)
    console.log('--css file ' + id + ' generated in:', cssPath)
  })
}

function generateScssContent(spriteData, id) {
  let cssContent = ''

  for (const [filename, coordinates] of Object.entries(spriteData)) {
    const { x, y, width, height } = coordinates

    const className = path.basename(filename, path.extname(filename))
    cssContent += `.${defaultClass}.${className} {\n`
    cssContent += `  background-image: url('../images/spritesheet${id}.png');\n`
    cssContent += `  background-position: -${x}px -${y}px;\n`
    cssContent += `  width: ${width}px;\n`
    cssContent += `  height: ${height}px;\n`
    cssContent += `}\n\n`
  }

  return cssContent
}
