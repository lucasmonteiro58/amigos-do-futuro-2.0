import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unfonts from 'unplugin-fonts/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import preload from 'vite-plugin-preload'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/components', 'src/composables', 'src/utils', 'src/stores/**'],
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
    }),
    preload(),
    Unfonts({
      google: {
        families: [
          'Bungee',
          'Viga',
          {
            name: 'Exo 2',
            styles: 'wght@100;200;300;400;500;600;700;800;900'
          }
        ]
      },
      custom: {
        families: [
          {
            name: 'Front',
            local: 'Front',
            src: './src/assets/fonts/Front/*.otf'
          },
          {
            name: 'Norwester',
            local: 'Norwester',
            src: './src/assets/fonts/Norwester/*.otf'
          },
          {
            name: 'PoetsenOne',
            local: 'PoetsenOne',
            src: './src/assets/fonts/PoetsenOne/*.ttf'
          }
        ],
        display: 'auto',
        preload: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  }
})
