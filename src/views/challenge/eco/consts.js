import planta_item1_eco_bom from '@/assets/images/sprites/economia/planta_item1_eco_bom.png'
import planta_item1_eco_ruim from '@/assets/images/sprites/economia/planta_item1_eco_ruim.png'
import planta_item4_eco_bom from '@/assets/images/sprites/economia/planta_item4_eco_bom.png'
import planta_item2_eco_bom from '@/assets/images/sprites/economia/planta_item2_eco_bom.png'
import planta_item2_eco_ruim from '@/assets/images/sprites/economia/planta_item2_eco_ruim.png'
import planta_item3_eco_ruim from '@/assets/images/sprites/economia/planta_item3_eco_ruim.png'
import planta_item3_eco_bom from '@/assets/images/sprites/economia/planta_item3_eco_bom.png'

export const balls = [
  {
    value: 10,
    type: 'good',
    stage: 0,
    text: '+10 por vender um brinquedo antigo',
    img: planta_item1_eco_bom,
    position: 'bottom-[200px] right-[420px]',
    x: 750,
    y: 680
  },
  {
    value: -10,
    type: 'bad',
    stage: 1,
    text: '-10 por comprar dois brinquedos',
    img: planta_item1_eco_ruim,
    position: 'bottom-[160px] right-[200px]',
    x: 1000,
    y: 720
  },
  {
    value: 10,
    type: 'good',
    stage: 1,
    text: '+10 por passear com o cão da vizinha',
    img: planta_item4_eco_bom,
    position: 'bottom-[460px] right-[180px]',
    x: 1070,
    y: 480
  },
  {
    value: 10,
    type: 'good',
    stage: 2,
    text: '+10 por ganhar moedas da avó',
    img: planta_item2_eco_bom,
    position: 'bottom-[660px] right-[530px]',
    x: 750,
    y: 220
  },
  {
    value: -10,
    type: 'bad',
    stage: 3,
    text: '-10 por quebrar o vaso da mãe',
    img: planta_item2_eco_ruim,
    position: 'bottom-[810px] right-[410px]',
    x: 830,
    y: 70
  },
  {
    value: -10,
    type: 'bad',
    stage: 3,
    text: '-10 por gastar dinheiro com doces',
    img: planta_item3_eco_ruim,
    position: 'bottom-[650px] right-[890px]',
    x: 360,
    y: 230
  },
  {
    value: 10,
    type: 'good',
    stage: 3,
    text: '+10 por vender biscoitos na rua',
    img: planta_item3_eco_bom,
    position: 'bottom-[300px] right-[990px]',
    x: 260,
    y: 580
  }
]
