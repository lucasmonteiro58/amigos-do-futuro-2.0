import { criticalAssets, backgroundAssets, globalDecode, routeNeeds } from '@/consts/_preload'
import { loadAudioGroup, audioGroupSources } from '@/utils/audio'

// Downloading is not enough to keep animations smooth: the browser only decodes an image the
// first time it is painted, which stalls that frame. So:
// - the loading screen only waits for what the home screen and every later screen need, and
//   decodes it;
// - everything else keeps downloading in the background, in the order the player reaches it;
// - before each route opens, its images are awaited (behind a loading screen, shown at once so
//   the tap never looks ignored) and decoded. Videos and voice lines stream instead. Decoding all of them at once would not fit in memory
//   on low end devices.

const BACKGROUND_CONCURRENCY = 3

const downloads = new Map() // asset key -> Promise of the finished download
const finished = new Set() // asset keys whose download is done
const controllers = new Map() // url -> AbortController of a running video download
const bytes = new Map() // asset key -> { loaded, total }
const images = new Map() // url -> Promise of the loaded HTMLImageElement (keeps it in memory cache)
const bitmaps = new Map() // absolute url -> decoded ImageBitmap for canvas animations
const objectUrls = new Map() // url -> blob url of a downloaded video/audio
let routeBitmaps = new Set()

const absolute = (url) => new URL(url, document.baseURI).href
const assetKey = (asset) => (asset.type === 'audio' ? `audio:${asset.group}` : asset.url)
const assetUrl = (asset) => (asset.type === 'audio' ? audioGroupSources[asset.group] : asset.url)

/**
 * Url to use for a preloaded video (a blob url once it was downloaded). A video still
 * downloading plays streamed from its own url, and its download stops so the two don't
 * compete for bandwidth.
 */
export function getMediaUrl(url) {
  if (objectUrls.has(url)) return objectUrls.get(url)
  controllers.get(url)?.abort()
  return url
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

/** fetch() that reports the downloaded bytes of `key`, for byte accurate progress bars. */
async function fetchBlob(url, key, signal) {
  const response = await fetch(url, { signal })
  const total = Number(response.headers.get('content-length')) || 0
  const progress = { loaded: 0, total }
  bytes.set(key, progress)
  if (!response.body) return response.blob()

  const reader = response.body.getReader()
  const chunks = []
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    chunks.push(value)
    progress.loaded += value.length
  }
  progress.total = Math.max(progress.total, progress.loaded)
  return new Blob(chunks, { type: response.headers.get('content-type') || '' })
}

async function runDownload(asset) {
  const key = assetKey(asset)
  const url = assetUrl(asset)
  const controller = asset.type === 'media' ? new AbortController() : null
  if (controller) controllers.set(url, controller)
  try {
    const blob = await fetchBlob(url, key, controller?.signal)
    if (asset.type === 'image') {
      // the image itself comes from the HTTP cache: CSS backgrounds use this same url
      await loadImage(url)
    } else if (asset.type === 'media' || asset.type === 'audio') {
      objectUrls.set(url, URL.createObjectURL(blob))
      if (asset.type === 'audio') await loadAudioGroup(asset.group, objectUrls.get(url))
    }
  } catch (error) {
    if (error.name !== 'AbortError') console.error('Erro ao pré-carregar:', url, error)
    if (asset.type === 'image') await loadImage(url)
  } finally {
    controllers.delete(url)
    finished.add(key)
  }
}

/** Downloads `asset` once; later calls return the same promise. */
function download(asset) {
  const key = assetKey(asset)
  if (!downloads.has(key)) downloads.set(key, runDownload(asset))
  return downloads.get(key)
}

/** Downloaded share (0-100) of `assets`, counted in bytes. */
function progressOf(assets) {
  let loaded = 0
  let total = 0
  for (const asset of assets) {
    const progress = bytes.get(assetKey(asset))
    if (!progress) continue
    loaded += progress.loaded
    total += progress.total
  }
  return total ? Math.min(99, Math.floor((loaded / total) * 100)) : 0
}

function downloadInBackground(assets) {
  const queue = [...assets]
  const worker = async () => {
    // assets a route already asked for are skipped here: download() returns the running one
    while (queue.length) await download(queue.shift())
  }
  for (let i = 0; i < BACKGROUND_CONCURRENCY; i++) worker()
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
async function decodeRoute(route) {
  const target = routeNeeds(route).decode
  const keep = new Set(target.animations.map(absolute))
  for (const key of routeBitmaps) {
    // mounted canvases keep their own reference until they unmount, so this is safe
    if (!keep.has(key)) bitmaps.delete(key)
  }
  routeBitmaps = keep
  await decode(target)
}

function loadRouteComponents(router) {
  return router
    .getRoutes()
    .map((route) => route.components?.default)
    .filter((component) => typeof component === 'function')
    .map((load) => load().catch(() => {}))
}

const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function usePreload() {
  const assetsLoaded = ref(false)
  const loadingProgress = ref(0)
  const routeLoading = ref(false)
  const routeProgress = ref(0)
  const router = useRouter()

  function trackProgress(assets, target) {
    const interval = setInterval(() => {
      // never moves backwards when a new download reveals its size
      target.value = Math.max(target.value, progressOf(assets))
    }, 100)
    return () => clearInterval(interval)
  }

  /**
   * Waits for the images of `route` and decodes them. Whenever that is not instant a loading
   * screen covers the old route, so the tap never looks ignored.
   */
  async function prepareRoute(route) {
    const { assets } = routeNeeds(route)
    const pending = Promise.all(assets.map(download))
    let stop = () => {}
    if (!assets.every((asset) => finished.has(assetKey(asset)))) {
      routeProgress.value = 0
      routeLoading.value = true
      stop = trackProgress(assets, routeProgress)
      // a broken download must not lock the player out of the screen
      await Promise.race([pending, timeout(30000)])
    }
    const decoded = Promise.race([decodeRoute(route), timeout(1500)])
    if (!routeLoading.value && !(await Promise.race([decoded.then(() => true), timeout(100)]))) {
      routeProgress.value = 99 // everything is downloaded, only decoding is left
      routeLoading.value = true
    }
    await decoded
    stop()
    routeLoading.value = false
  }


  async function preloadAssets() {
    const stop = trackProgress(criticalAssets, loadingProgress)
    try {
      await Promise.all([
        ...loadRouteComponents(router),
        ...criticalAssets.map(download),
        document.fonts?.ready
      ])
      await Promise.all([
        decode(globalDecode),
        router.isReady().then(() => prepareRoute(router.currentRoute.value))
      ])
    } catch (error) {
      console.error('Erro ao pré-carregar os ativos:', error)
    }
    stop()

    downloadInBackground(backgroundAssets)
    router.beforeEach((to) => prepareRoute(to))
    loadingProgress.value = 100
    assetsLoaded.value = true
  }

  return {
    assetsLoaded,
    preloadAssets,
    loadingProgress,
    routeLoading,
    routeProgress
  }
}
