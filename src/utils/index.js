export function transformFont(font) {
  if (font.basename.includes('Regular')) {
    font.weight = 400
  } else if (font.basename.includes('Bold')) {
    font.weight = 700
  } else if (font.basename.includes('Black')) {
    font.weight = 900
  } else if (font.basename.includes('ExtraBold')) {
    font.weight = 800
  } else if (font.basename.includes('ExtraLight')) {
    font.weight = 200
  } else if (font.basename.includes('Light')) {
    font.weight = 300
  } else if (font.basename.includes('Medium')) {
    font.weight = 500
  } else if (font.basename.includes('SemiBold')) {
    font.weight = 600
  } else if (font.basename.includes('Thin')) {
    font.weight = 100
  }
  return font
}

export function getBadgeName(name) {
  switch (name) {
    case 'eco':
      return ['a', 'Economia']
    case 'edu':
      return ['a', 'Educação']
    case 'gov':
      return ['o', 'Governo']
    case 'ino':
      return ['a', 'Inovação']
    case 'laz':
      return ['o', 'Lazer']
    case 'mei':
      return ['a', 'Sustentabilidade']
    case 'sau':
      return ['a', 'Saúde']
  }
}

export function moveLeftKeyboard(currentPosition, containerElement) {
  if (currentPosition.left > containerElement.offsetLeft - 60) {
    currentPosition.left -= 10
  }
}

export function moveUpKeyboard(currentPosition, containerElement) {
  if (currentPosition.top > containerElement.offsetTop - 20) {
    currentPosition.top -= 10
  }
}

export function moveRightKeyboard(currentPosition, element, containerElement) {
  const containerRight = containerElement.offsetLeft + containerElement.offsetWidth - 60
  if (currentPosition.left + element.offsetWidth < containerRight) {
    currentPosition.left += 10
  }
}

export function moveDownKeyboard(currentPosition, element, containerElement) {
  const containerBottom = containerElement.offsetTop + containerElement.offsetHeight - 25
  if (currentPosition.top + element.offsetHeight < containerBottom) {
    currentPosition.top += 10
  }
}
