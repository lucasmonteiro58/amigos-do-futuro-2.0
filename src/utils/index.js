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
