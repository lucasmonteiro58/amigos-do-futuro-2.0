import image from '../assets/images/spritesheet.png'
import audio from '../assets/audios/audio.mp3'

const resources = [
  { url: image, tipe: 'image' },
  { url: audio, type: 'audio' }
]

// Função para fazer o load dos recursos
// function loadResources() {
//   let loadedResources = 0
//   let totalResources = resources.length

//   // Percorre o array de recursos para carregar os dados
//   for (let i = 0; i < resources.length; i++) {
//     const resource = resources[i]
//     const xhr = new XMLHttpRequest()
//     xhr.open('GET', resource.url, true)
//     xhr.responseType = 'blob'

//     xhr.onloadstart = function () {
//       resource.loadedSize = 0 // Armazena o tamanho carregado do recurso
//       resource.totalSize = 0 // Armazena o tamanho total do recurso
//     }

//     xhr.onprogress = function (event) {
//       if (event.lengthComputable) {
//         resource.loadedSize = event.loaded
//         resource.totalSize = event.total

//         // Calcula a porcentagem total de carregamento com base no tamanho total e carregado de todos os recursos
//         const totalLoadedSize = resources.reduce((total, res) => total + res.loadedSize, 0)
//         const totalTotalSize = resources.reduce((total, res) => total + res.totalSize, 0)
//         const totalPercentage = (totalLoadedSize / totalTotalSize) * 100
//         console.log(`Progresso geral: ${totalPercentage.toFixed(2)}%`)
//       }
//     }

//     xhr.onload = function () {
//       if (xhr.status === 200) {
//         loadedResources++

//         if (loadedResources === totalResources) {
//           console.log('Todos os recursos foram carregados!')
//         }
//       }
//     }

//     xhr.send()
//   }
// }

function loadResources() {
  let loadedResources = 0
  let totalResources = resources.length
  let totalLoadedSize = 0
  let totalTotalSize = 0

  // Percorre o array de recursos para carregar os dados
  for (let i = 0; i < resources.length; i++) {
    const resource = resources[i]
    const xhr = new XMLHttpRequest()
    xhr.open('GET', resource.url, true)

    if (resource.type === 'image') {
      xhr.responseType = 'blob'
    } else if (resource.type === 'audio') {
      xhr.responseType = 'arraybuffer'
    }

    xhr.onloadstart = function () {
      resource.loadedSize = 0 // Armazena o tamanho carregado do recurso
      resource.totalSize = 0 // Armazena o tamanho total do recurso
    }

    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        resource.loadedSize = event.loaded
        resource.totalSize = event.total

        totalLoadedSize = resources.reduce((total, res) => total + res.loadedSize, 0)
        totalTotalSize = resources.reduce((total, res) => total + res.totalSize, 0)
        const totalPercentage = (totalLoadedSize / totalTotalSize) * 100
        console.log(`Progresso geral: ${totalPercentage.toFixed(2)}%`)
      }
    }

    xhr.onload = function () {
      if (xhr.status === 200) {
        loadedResources++

        if (loadedResources === totalResources) {
          console.log('Todos os recursos foram carregados!')
        }
      }
    }

    xhr.send()
  }
}

// // Função para calcular o tamanho total dos recursos
// function calculateTotalSize() {
//   return resources.reduce((total, resource) => {
//     if (resource.size) {
//       return total + resource.size
//     } else {
//       // Use um tamanho estimado para o recurso caso o content-length não esteja presente
//       if (resource.type === 'image') {
//         return total + 1024 // Tamanho estimado para imagens em bytes
//       } else if (resource.type === 'audio') {
//         return total + 2048 // Tamanho estimado para áudio em bytes
//       }
//     }
//     return total
//   }, 0)
// }

// // Função para atualizar o progresso de carregamento
// function updateProgress(loadedSize, totalSize) {
//   const overallProgress = ((loadedSize / totalSize) * 100) / 10000
//   console.log(`Progresso geral: ${overallProgress.toFixed(2)}%`)
// }
// // Função assíncrona para carregar os recursos
// async function loadResources() {
//   let loadedSize = 0
//   let totalSize = calculateTotalSize()

//   try {
//     // Percorre o array de recursos para fazer o carregamento
//     for (const resource of resources) {
//       const response = await fetch(resource.url)
//       const size = Number(response.headers.get('content-length'))
//       resource.size = size

//       const reader = response.body.getReader()

//       let done = false

//       while (!done) {
//         const { done: chunkDone, value } = await reader.read()
//         done = chunkDone

//         if (value) {
//           loadedSize += value.length
//           updateProgress(loadedSize, totalSize)
//         }
//       }
//     }

//     console.log('Todos os recursos foram carregados!')
//   } catch (error) {
//     console.error('Ocorreu um erro ao carregar os recursos:', error)
//   }
// }

// Chama a função para carregar os recursos
loadResources()
