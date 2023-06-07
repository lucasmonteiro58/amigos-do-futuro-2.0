import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Spritesmith from 'vite-plugin-spritesmith'
import clearFiles from './src/plugins/clearFiles'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

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
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/components', 'src/composables', 'src/utils', 'src/store/**'],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      dts: 'src/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
