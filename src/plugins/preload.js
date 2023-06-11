const resources = [
  { url: import('../assets/images/spritesheet.png'), type: 'image' },
  { url: import('../assets/audios/audio.mp3'), type: 'audio' }
]

function loadResources() {
  // let loadedResources = 0
  // let totalResources = resources.length
  let totalLoadedSize = 0
  let totalTotalSize = 0
  document.getElementById('app').style.display = 'none'

  resources.forEach((resource) => {
    const { url, type } = resource

    if (type === 'image') {
      url.then((image) => {
        const img = new Image()
        img.onload = function () {
          // loadedResources++
        }
        img.src = image.default
      })
    } else if (type === 'audio') {
      url.then((audio) => {
        const audioElement = new Audio()
        audioElement.oncanplaythrough = function () {
          // loadedResources++
        }
        audioElement.src = audio.default
      })
    }

    url.catch((error) => {
      console.error(`Erro ao carregar recurso: ${error}`)
    })
  })

  function updateProgress() {
    const totalPercentage = (totalLoadedSize / totalTotalSize) * 100
    console.log(`Progresso geral: ${totalPercentage.toFixed(2)}%`)
    document.getElementById('progress').innerHTML = `${totalPercentage.toFixed(2)}%`
    if (totalPercentage === 100) {
      document.getElementById('app').style.display = 'block'
      document.getElementById('loading').style.display = 'none'
      console.log('Todos os recursos foram carregados!')
    }
  }

  function updateResourceProgress() {
    // const { loadedSize, totalSize } = resource
    // const resourcePercentage = (loadedSize / totalSize) * 100
    // console.log(`Progresso do recurso: ${resourcePercentage.toFixed(2)}%`)
  }

  resources.forEach((resource) => {
    const { url } = resource
    url.then((data) => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', data.default, true)

      if (resource.type === 'image') {
        xhr.responseType = 'blob'
      } else if (resource.type === 'audio') {
        xhr.responseType = 'arraybuffer'
      }

      xhr.onloadstart = function () {
        resource.loadedSize = 0
        resource.totalSize = 0
      }

      xhr.onprogress = function (event) {
        if (event.lengthComputable) {
          resource.loadedSize = event.loaded
          resource.totalSize = event.total

          totalLoadedSize = resources.reduce((total, res) => total + res.loadedSize, 0)
          totalTotalSize = resources.reduce((total, res) => total + res.totalSize, 0)

          updateProgress()
          updateResourceProgress(resource)
        }
      }

      xhr.onload = function () {
        if (xhr.status === 200) {
          // loadedResources++
        }
      }

      xhr.send()
    })
  })
}

loadResources()
