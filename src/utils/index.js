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
