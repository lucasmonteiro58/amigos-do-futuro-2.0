import { Howl } from 'howler'
import effectsSrc from '@/assets/audios/effects.mp3'
import linesSrc from '@/assets/audios/lines.mp3'
import audioSprites from '@/assets/audios/audio.json'

// Short effects are decoded up front (Web Audio, no latency). The long voice lines are played
// through HTML5 audio so ~17 minutes of speech never sit decoded in memory.
const audioGroups = {
  effects: { src: effectsSrc, html5: false },
  lines: { src: linesSrc, html5: true }
}

const howls = {}
const groupOfSound = {}
for (const [group, sprite] of Object.entries(audioSprites)) {
  for (const id of Object.keys(sprite)) groupOfSound[id] = group
}

function createHowl(group, src, onDone) {
  const { html5 } = audioGroups[group]
  howls[group] = new Howl({
    src: [src],
    format: ['mp3'],
    html5,
    sprite: audioSprites[group],
    onload: onDone,
    onloaderror: onDone
  })
}

function getHowl(group) {
  if (!howls[group]) createHowl(group, audioGroups[group].src)
  return howls[group]
}

export const audioGroupSources = Object.fromEntries(
  Object.entries(audioGroups).map(([group, { src }]) => [group, src])
)

/** Creates the Howl of `group` from its already downloaded source (e.g. a blob url). */
export function loadAudioGroup(group, src) {
  // a sound played before the download finished already created it from the original url
  if (howls[group]) return Promise.resolve()
  return new Promise((resolve) => {
    // HTML5 audio may never report "loaded" before a user gesture (iOS), so don't wait forever
    const timeout = setTimeout(resolve, 3000)
    createHowl(group, src, () => {
      clearTimeout(timeout)
      resolve()
    })
  })
}

/**
 * A playback channel. With `interrupt` a new sound stops the previous one of the same channel;
 * `stop` stops every sound the channel started.
 */
export function createAudioChannel({ interrupt = false, loop = false } = {}) {
  let playing = []

  function stop() {
    playing.forEach(({ howl, id }) => howl.stop(id))
    playing = []
  }

  function play({ id: name }) {
    const group = groupOfSound[name]
    if (!group) return console.warn(`Audio "${name}" not found`)
    if (interrupt) stop()
    const howl = getHowl(group)
    const id = howl.play(name)
    playing.push({ howl, id })
    // a looping sound fires "end" on every lap, so it is only forgotten by stop()
    if (loop) howl.loop(true, id)
    else howl.once('end', () => (playing = playing.filter((sound) => sound.id !== id)), id)
  }

  return { play, stop }
}
