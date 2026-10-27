/* eslint-disable no-undef */
// Builds the Howler audio sprites from the source files in src/assets/audios/sprites.
// Sounds are split in groups so short effects can be fully decoded (Web Audio, low latency)
// while long voice lines are streamed (HTML5 audio) without holding minutes of PCM in memory.
// Requires ffmpeg with libmp3lame.
const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')

const SOURCE_DIR = 'src/assets/audios/sprites'
const OUTPUT_DIR = 'src/assets/audios'
const SAMPLE_RATE = 44100
const BITRATE = '64k'
const GAP_SECONDS = 1

// folder -> group. Folders not listed here go to the "lines" group.
const groups = {
  feedback: 'effects',
  feedback_desafios: 'effects'
}

function decodeToPcm(file) {
  return execFileSync(
    'ffmpeg',
    ['-v', 'error', '-i', file, '-ac', '1', '-ar', String(SAMPLE_RATE), '-f', 'f32le', '-'],
    { maxBuffer: 1024 * 1024 * 1024 }
  )
}

function encode(rawFile, output) {
  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    '-f', 'f32le', '-ar', String(SAMPLE_RATE), '-ac', '1', '-i', rawFile,
    '-c:a', 'libmp3lame', '-b:a', BITRATE, output
  ])
}

function buildGroup(name, files) {
  console.log(`🔊 ${name}: ${files.length} files`)
  const chunks = []
  const sprite = {}
  let offsetSamples = 0

  for (const file of files.sort()) {
    const pcm = decodeToPcm(file)
    const samples = pcm.length / 4
    const id = path.basename(file, path.extname(file))
    sprite[id] = [(offsetSamples / SAMPLE_RATE) * 1000, (samples / SAMPLE_RATE) * 1000]
    chunks.push(pcm)
    // start every sound on a whole second, with a gap of silence after the previous one
    const paddedSamples = (Math.ceil(samples / SAMPLE_RATE) + GAP_SECONDS) * SAMPLE_RATE
    chunks.push(Buffer.alloc((paddedSamples - samples) * 4))
    offsetSamples += paddedSamples
  }

  const rawFile = path.join(OUTPUT_DIR, `${name}.raw`)
  fs.writeFileSync(rawFile, Buffer.concat(chunks))
  encode(rawFile, path.join(OUTPUT_DIR, `${name}.mp3`))
  fs.unlinkSync(rawFile)

  return sprite
}

function generate() {
  const byGroup = {}
  for (const folder of fs.readdirSync(SOURCE_DIR)) {
    const dir = path.join(SOURCE_DIR, folder)
    if (!fs.statSync(dir).isDirectory()) continue
    const group = groups[folder] || 'lines'
    byGroup[group] = byGroup[group] || []
    for (const file of fs.readdirSync(dir)) {
      if (!file.startsWith('.')) byGroup[group].push(path.join(dir, file))
    }
  }

  const manifest = {}
  for (const [name, files] of Object.entries(byGroup)) {
    manifest[name] = buildGroup(name, files)
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'audio.json'), JSON.stringify(manifest, null, 2) + '\n')
  console.log('✅ Audio sprites generated')
}

generate()
