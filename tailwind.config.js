export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: {
            DEFAULT: '#376296',
            light: '#247ba0',
            dark: '#305882',
            text: '#4573B8'
          },
          green: {
            DEFAULT: '#3c9c74',
            light: '#70c1b3'
          },
          yellow: '#ffe066',
          orange: '#f25f5c',
          brown: '#92492d'
        },
        gray: {
          500: '#333'
        }
      },
      fontFamily: {
        norwester: ['"Norwester"', 'sans-serif'],
        front: ['"Front"', 'sans-serif'],
        exo: ['"Exo"', 'sans-serif'],
        'exo-bold': ['"Exo-bold"', 'sans-serif'],
        'exo-medium': ['"Exo-medium"', 'sans-serif'],
        viga: ['"Viga"', 'sans-serif'],
        poetsenone: ['"PoetsenOne"', 'sans-serif'],
        bungee: ['"Bungee"', 'sans-serif']
      },
      cursor: {
        default: 'url(@/assets/images/pointers/pointerverde.png), default',
        auto: 'url(@/assets/images/pointers/pointerverde.png), auto',
        pointer: 'url(@/assets/images/pointers/pointerclick.png), pointer',
        wait: 'url(@/assets/images/pointers/pointerazul.png), wait',
        text: 'url(@/assets/images/pointers/pointertext.png), text',
        move: 'url(@/assets/images/pointers/pointerdrag.png), move',
        grab: 'url(@/assets/images/pointers/pointerdrag.png), grab',
        grabbing: 'url(@/assets/images/pointers/pointermove.png), grabbing',
        block: 'url(@/assets/images/pointers/pointerblock.png), block',
        'not-allowed': 'url(@/assets/images/pointers/pointerblock.png), not-allowed'
      }
    }
  },
  plugins: []
}
