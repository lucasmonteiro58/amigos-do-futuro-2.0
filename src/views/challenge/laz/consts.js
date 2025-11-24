export const pages = [
  {
    id: 1,
    background: 'bg_pagina1e2',
    stickers: [
      {
        id: 'tecel',
        sprite: 'album1_pg1_tecel',
        top: '84%',
        left: '18.5%',
        width: '11.3%',
        targetId: 'tecel_target'
      },
      {
        id: 'cuscuz',
        sprite: 'album1_pg1_cuscuz',
        top: '84%',
        left: '34.5%',
        width: '11.3%',
        targetId: 'cuscuz_target'
      },
      {
        id: 'couro',
        sprite: 'album1_pg1_couro',
        top: '84%',
        left: '50.5%',
        width: '11.3%',
        targetId: 'couro_target'
      },
      {
        id: 'panelada',
        sprite: 'album1_pg1_panelada',
        top: '84%',
        left: '66.5%',
        width: '11.3%',
        targetId: 'panelada_target'
      }
    ],
    dropZones: [
      {
        id: 'couro_target',
        accepts: 'couro',
        sprite: 'album1_pg1_couro_fita',
        top: '14.6%',
        left: '23%',
        width: '14%'
      },
      {
        id: 'cuscuz_target',
        accepts: 'cuscuz',
        sprite: 'album1_pg1_cuscuz_fita',
        top: '10.6%',
        left: '53%',
        width: '14%'
      },
      {
        id: 'tecel_target',
        accepts: 'tecel',
        sprite: 'album1_pg1_tecelagem_fita',
        top: '42%',
        left: '37.5%',
        width: '14%'
      },
      {
        id: 'panelada_target',
        accepts: 'panelada',
        sprite: 'album1_pg1_panelada_fita',
        top: '45%',
        left: '52%',
        width: '14%'
      }
    ]
  },
  {
    id: 2,
    background: 'bg_pagina3e4',
    stickers: [
      {
        id: 'caninde',
        sprite: 'album1_pg2_caninde',
        top: '84%',
        left: '18.5%',
        width: '11.3%',
        targetId: 'caninde_target'
      },
      {
        id: 'indios',
        sprite: 'album1_pg2_indios',
        top: '84%',
        left: '34.5%',
        width: '11.3%',
        targetId: 'indios_target'
      },
      {
        id: 'saojoao',
        sprite: 'album1_pg2_saojoao',
        top: '84%',
        left: '50.5%',
        width: '11.3%',
        targetId: 'saojoao_target'
      },
      {
        id: 'saojoao2',
        sprite: 'album1_pg2_saojoao2',
        top: '84%',
        left: '66.5%',
        width: '11.3%',
        targetId: 'saojoao2_target'
      }
    ],
    dropZones: [
      {
        id: 'saojoao_target',
        accepts: 'saojoao',
        sprite: 'album1_pg2_saojoao_fita',
        top: '12.8%',
        left: '36.7%',
        width: '14%'
      },
      {
        id: 'saojoao2_target',
        accepts: 'saojoao2',
        sprite: 'album1_pg2_saojoao2_fita',
        top: '16.2%',
        left: '52.1%',
        width: '14%'
      },
      {
        id: 'indios_target',
        accepts: 'indios',
        sprite: 'album1_pg2_indios_fita',
        top: '45.2%',
        left: '36.7%',
        width: '14%'
      },
      {
        id: 'caninde_target',
        accepts: 'caninde',
        sprite: 'album1_pg2_caninde_fita',
        top: '48%',
        left: '51.9%',
        width: '14%'
      }
    ]
  }
]
