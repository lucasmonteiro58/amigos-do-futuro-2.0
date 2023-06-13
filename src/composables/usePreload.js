import imageSrc from '@/assets/images/spritesheet.png'
import audioSrc from '@/assets/audios/audio.mp3'

import animationCount from '@/assets/animations/counter/sprite.png'

export default function usePreload() {
  const assetsLoaded = ref(false)
  const loadingProgress = ref(0)

  const assets = {
    images: [imageSrc, animationCount],
    audios: [audioSrc]
  }

  function updateProgress(assetsLoadedCount, totalAssets) {
    loadingProgress.value = (assetsLoadedCount / totalAssets) * 100
    loadingProgress.value = Math.round(loadingProgress.value)
  }

  async function preloadImages() {
    const imageAssets = assets.images
    let assetsLoadedCount = 0

    for (const asset of imageAssets) {
      try {
        await new Promise((resolve) => {
          const img = new Image()
          img.onload = () => {
            updateProgress(++assetsLoadedCount, imageAssets.length + assets.audios.length)
            resolve()
          }
          img.onerror = () => {
            updateProgress(++assetsLoadedCount, imageAssets.length + assets.audios.length)
            resolve()
          }
          img.src = asset
        })
      } catch (error) {
        console.error('Erro ao pré-carregar a imagem:', error)
      }
    }
  }

  async function preloadAudios() {
    const audioAssets = assets.audios
    let assetsLoadedCount = 0

    for (const asset of audioAssets) {
      try {
        await new Promise((resolve) => {
          const audio = new Audio()
          audio.onloadedmetadata = () => {
            updateProgress(++assetsLoadedCount, assets.images.length + audioAssets.length)
            resolve()
          }
          audio.onerror = () => {
            updateProgress(++assetsLoadedCount, assets.images.length + audioAssets.length)
            resolve()
          }
          audio.src = asset
        })
      } catch (error) {
        console.error('Erro ao pré-carregar o áudio:', error)
      }
    }
  }

  async function preloadAssets() {
    try {
      await Promise.all([preloadImages(), preloadAudios()])
      assetsLoaded.value = true
      loadingProgress.value = 100
    } catch (error) {
      assetsLoaded.value = true
      console.error('Erro ao pré-carregar os ativos:', error)
    }
  }

  return {
    assetsLoaded,
    preloadAssets,
    loadingProgress
  }
}
