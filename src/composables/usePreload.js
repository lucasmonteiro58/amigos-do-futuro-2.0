import { preloadImages, preloadMedia, globalDecode, routeDecode } from '@/consts/_preload'
import { loadAudioSprites, audioSources } from '@/utils/audio'

// Downloading is not enough to keep animations smooth: the browser only decodes an image the
// first time it is painted, which stalls that frame. So everything is downloaded on the loading
// screen, the assets used everywhere are decoded right away, and the rest is decoded right
// before the route that uses it (decoding all of it at once would not fit in memory on
// low end devices).

const images = new Map() // url -> loaded HTMLImageElement (keeps the download in memory cache)
const bitmaps = new Map() // absolute url -> decoded ImageBitmap for canvas animations
const objectUrls = new Map() // url -> blob url of a downloaded video/audio
let routeBitmaps = new Set()

const absolute = (url) => new URL(url, document.baseURI).href

/** Url to use for a preloaded video or audio file (a blob url once it was downloaded). */
export function getMediaUrl(url) {
  return objectUrls.get(url) || url
}

/** The decoded bitmap of an animation spritesheet when available, else the image itself. */
export function getDrawable(image) {
  return (image?.src && bitmaps.get(image.src)) || image
}

function loadImage(url) {
  if (!images.has(url)) {
    const image = new Image()
    image.src = url
    images.set(
      url,
      new Promise((resolve) => {
        image.onload = () => resolve(image)
        image.onerror = () => resolve(image)
      })
    )
  }
  return images.get(url)
}

async function fetchObjectUrl(url) {
  if (objectUrls.has(url)) return
  try {
    const response = await fetch(url)
    objectUrls.set(url, URL.createObjectURL(await response.blob()))
  } catch (error) {
    console.error('Erro ao pré-carregar a mídia:', url, error)
  }
}

async function decodeSheet(url) {
  const image = await loadImage(url)
  await image.decode().catch(() => {})
}

async function decodeAnimation(url) {
  const key = absolute(url)
  if (bitmaps.has(key)) return
  const image = await loadImage(url)
  try {
    bitmaps.set(key, await createImageBitmap(image))
  } catch {
    await image.decode().catch(() => {})
  }
}

function decode({ sheets, animations }) {
  return Promise.all([...sheets.map(decodeSheet), ...animations.map(decodeAnimation)])
}

/** Decodes what `route` needs and releases the animation bitmaps of the previous route. */
export async function prepareRoute(route) {
  const target = routeDecode(route)
  const keep = new Set(target.animations.map(absolute))
  for (const key of routeBitmaps) {
    // mounted canvases keep their own reference until they unmount, so this is safe
    if (!keep.has(key)) bitmaps.delete(key)
  }
  routeBitmaps = keep
  await decode(target)
}

function preloadRouteComponents(router) {
  return router
    .getRoutes()
    .map((route) => route.components?.default)
    .filter((component) => typeof component === 'function')
    .map((load) => load().catch(() => {}))
}

export default function usePreload() {
  const assetsLoaded = ref(false)
  const loadingProgress = ref(0)
  const router = useRouter()

  function track(promises) {
    let done = 0
    return promises.map((promise) =>
      Promise.resolve(promise).finally(() => {
        loadingProgress.value = Math.min(99, Math.round((++done / promises.length) * 100))
      })
    )
  }

  async function preloadAssets() {
    try {
      const downloads = [
        ...preloadRouteComponents(router),
        ...preloadImages.map(loadImage),
        ...[...preloadMedia, ...audioSources].map(fetchObjectUrl),
        document.fonts?.ready
      ]
      await Promise.all(track(downloads))
      await Promise.all([
        loadAudioSprites(getMediaUrl),
        decode(globalDecode),
        router.isReady().then(() => prepareRoute(router.currentRoute.value))
      ])
    } catch (error) {
      console.error('Erro ao pré-carregar os ativos:', error)
    }

    // from now on every navigation waits (briefly) for its images to be decoded
    router.beforeEach((to) => Promise.race([prepareRoute(to), new Promise((r) => setTimeout(r, 1500))]))
    loadingProgress.value = 100
    assetsLoaded.value = true
  }

  return {
    assetsLoaded,
    preloadAssets,
    loadingProgress
  }
}
