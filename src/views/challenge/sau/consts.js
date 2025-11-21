// Food items - healthy and unhealthy
// Positions converted from % to px (1920x1080 container)
// Widths are in % as they will be applied via CSS classes or inline styles
export const healthyFoods = [
  {
    name: 'alface',
    sprite: 'prato_alface',
    spriteOnPlate: 'prato_alfaceprato',
    top: '421px', // 39% * 10.8 = 421.2
    left: '346px', // 18% * 19.2 = 345.6
    width: '10%', // Original: 10%
    onPlateTop: '475px', // 44% * 10.8 = 475.2
    onPlateLeft: '864px', // 45% * 19.2 = 864
    onPlateWidth: '10%'
  },
  {
    name: 'feijao',
    sprite: 'prato_feijao',
    spriteOnPlate: 'prato_feijaoprato',
    top: '594px', // 55% * 10.8 = 594
    right: '192px', // 10% * 19.2 = 192
    width: '14%', // Original: 14%
    onPlateTop: '713px', // 66% * 10.8 = 712.8
    onPlateLeft: '806px', // 42% * 19.2 = 806.4
    onPlateWidth: '12%'
  },
  {
    name: 'carne',
    sprite: 'prato_carne',
    spriteOnPlate: 'prato_carneprato',
    top: '702px', // 65% * 10.8 = 702
    left: '192px', // 10% * 19.2 = 192
    width: '12%', // Original: 12%
    onPlateTop: '572px', // 53% * 10.8 = 572.4
    onPlateLeft: '768px', // 40% * 19.2 = 768
    onPlateWidth: '13%'
  },
  {
    name: 'arroz',
    sprite: 'prato_arroz',
    spriteOnPlate: 'prato_arrozprato',
    top: '421px', // 39% * 10.8 = 421.2
    right: '192px', // 10% * 19.2 = 192
    width: '12%', // Original: 12%
    onPlateTop: '616px', // 57% * 10.8 = 615.6
    onPlateLeft: '691px', // 36% * 19.2 = 691.2
    onPlateWidth: '9%'
  },
  {
    name: 'banana',
    sprite: 'prato_banana',
    spriteOnPlate: 'prato_bananaprato',
    top: '348px', // 35% * 10.8 = 378
    right: '768px', // 40% * 19.2 = 768
    width: '11%', // Original: 11%
    onPlateTop: '572px', // 53% * 10.8 = 572.4
    onPlateLeft: '998px', // 52% * 19.2 = 998.4
    onPlateWidth: '10%'
  },

  {
    name: 'cenoura',
    sprite: 'prato_cenoura',
    spriteOnPlate: 'prato_cenouraprato',
    top: '756px', // 70% * 10.8 = 756
    right: '326px', // 17% * 19.2 = 326.4
    width: '14%', // Original: 14%
    onPlateTop: '626px', // 58% * 10.8 = 626.4
    onPlateLeft: '922px', // 48% * 19.2 = 921.6
    onPlateWidth: '6%'
  },

  {
    name: 'batata',
    sprite: 'prato_batatadoce',
    spriteOnPlate: 'prato_batatadoceprato',
    top: '810px', // 75% * 10.8 = 810
    right: '730px', // 38% * 19.2 = 729.6
    width: '14%', // Original: 14%
    scale: 0.7, // Original: transform: scale(0.7)
    onPlateTop: '670px', // 62% * 10.8 = 669.6
    onPlateLeft: '768px', // 40% * 19.2 = 768
    onPlateWidth: '10%'
  },
  {
    name: 'laranja',
    sprite: 'prato_laranja',
    spriteOnPlate: 'prato_laranjaprato',
    top: '594px', // 55% * 10.8 = 594
    right: '0px', // -1% * 19.2 = -19.2 (using 19px as minimum)
    width: '14%', // Original: 14%
    scale: 0.5, // Original: transform: scale(0.5)
    onPlateTop: '605px', // 56% * 10.8 = 604.8
    onPlateLeft: '691px', // 36% * 19.2 = 691.2
    onPlateWidth: '6%'
  },
  {
    name: 'ovo',
    sprite: 'prato_ovos',
    spriteOnPlate: 'prato_ovoprato',
    top: '400px', // 37% * 10.8 = 399.6
    right: '384px', // 20% * 19.2 = 384
    width: '14%', // Original: 14%
    scale: 0.6, // Original: transform: scale(0.6)
    onPlateTop: '648px', // 60% * 10.8 = 648
    onPlateLeft: '1056px', // 55% * 19.2 = 1056
    onPlateWidth: '10%'
  },
  {
    name: 'queijo',
    sprite: 'prato_queijo',
    spriteOnPlate: 'prato_queijoprato',
    top: '421px', // 39% * 10.8 = 421.2
    left: '107px', // right: 84% means left: 16% = 307.2px
    width: '14%', // Original: 14%
    onPlateTop: '691px', // 64% * 10.8 = 691.2
    onPlateLeft: '960px', // 50% * 19.2 = 960
    onPlateWidth: '5%'
  }
]

export const unhealthyFoods = [
  {
    name: 'bombom',
    sprite: 'prato_bombom',
    spriteOnPlate: 'prato_bombomprato',
    top: '410px', // 38% * 10.8 = 410.4
    right: '1056px', // 55% * 19.2 = 1056
    width: '5%', // Original: 5%
    onPlateTop: '691px', // 64% * 10.8 = 691.2
    onPlateLeft: '1075px', // 56% * 19.2 = 1075.2
    onPlateWidth: '5%'
  },
  {
    name: 'pirulito',
    sprite: 'prato_pirulito',
    spriteOnPlate: 'prato_pirulitoprato',
    top: '454px', // 42% * 10.8 = 453.6
    right: '603px', // 34% * 19.2 = 652.8
    width: '5%', // Original: 5%
    onPlateTop: '637px', // 59% * 10.8 = 637.2
    onPlateLeft: '1171px', // 61% * 19.2 = 1171.2
    onPlateWidth: '3%'
  },
  {
    name: 'jujuba',
    sprite: 'prato_jujubas',
    spriteOnPlate: 'prato_jujubaprato',
    top: '745px', // 69% * 10.8 = 745.2
    right: '1171px', // 61% * 19.2 = 1171.2
    width: '14%', // Original: 14%
    onPlateTop: '680px', // 63% * 10.8 = 680.4
    onPlateLeft: '864px', // 45% * 19.2 = 864
    onPlateWidth: '10%'
  }
]

// Plate position
export const platePosition = {
  bottom: '248px', // 23% * 10.8 = 248.4
  left: '634px', // 33% * 19.2 = 633.6
  width: '35%' // Original: 35%
}

// Plate drop zone size - needs to match plate size
// Plate is 35% width, and roughly 30% height (based on visual)
export const plateDropZone = {
  width: '672px', // 35% * 19.2 = 672
  height: '324px' // ~30% * 10.8 = 324
}

// Health bar position
export const healthBarPosition = {
  top: '972px', // 90% * 10.8 = 972
  left: '618px', // 32.2% * 19.2 = 618.24
  width: '36%' // Original: 36%
}

// Biloto initial position (49.4% left from health bar start)
export const bilotoInitialLeft = '948px' // 49.4% * 19.2 = 948.48

// Biloto movement per food (3.44% = 66.048px)
export const bilotoStep = 66 // 3.44% * 19.2 = 66.048

// Success threshold (55.7% = 1069.44px from left edge, or relative to health bar)
export const successThreshold = 1069 // 55.7% * 19.2 = 1069.44

// Health labels position
export const healthLabelsPosition = {
  top: '972px', // 90% * 10.8 = 972
  saudavelLeft: '1325px', // 69% * 19.2 = 1324.8
  naoSaudavelRight: '1325px' // right: 69% = 1325px
}

// Submit button position
export const submitButtonPosition = {
  bottom: '54px', // 5% * 10.8 = 54
  right: '44px' // 2.3% * 19.2 = 44.16
}
