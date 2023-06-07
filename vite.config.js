import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Spritesmith from 'vite-plugin-spritesmith'
import clearFiles from './src/plugins/clearFiles'

clearFiles(['./src/assets/images/sprites/sprite.png', './src/assets/style/sprite.scss'])

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Spritesmith({
      watch: true,
      src: {
        cwd: './src/assets/images/sprites',
        glob: '**/*.png'
      },
      target: {
        image: './src/assets/images/sprites/sprite.png',
        css: './src/assets/style/sprite.scss'
      },
      apiOptions: {
        cssImageRef: './src/assets/images/sprites/sprite.png',
        spritesheet_info: {
          name: 'spritesheet'
        }
      },
      spritesmithOptions: {
        padding: 5
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
