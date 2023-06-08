export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: {
            DEFAULT: '#376296',
            light: '#247ba0',
            dark: '#305882'
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
      }
    }
  },
  plugins: []
}
