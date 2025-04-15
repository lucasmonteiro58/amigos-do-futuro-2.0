'use strict'

var FixedViewport
;(function (FixedViewport) {
  function hasNativeSupport() {
    var style = generateStyle()
    document.head.appendChild(style)
    var firstRule = style.sheet.cssRules[0]
    var supportsViewportRule = firstRule && (firstRule.type & 15) === 15
    document.head.removeChild(style)
    return supportsViewportRule
  }

  FixedViewport.hasNativeSupport = hasNativeSupport

  function generateStyle() {
    var style = document.createElement('style')
    style.textContent = '@-ms-viewport {} @-moz-viewport {} @-webkit-viewport {} @viewport {}'
    return style
  }

  function rescale(width, height) {
    var wrapper = document.getElementById('fixed-viewport-wrapper')
    if (!wrapper) {
      wrapper = document.createElement('div')
      wrapper.id = 'fixed-viewport-wrapper'
      while (document.body.firstChild) {
        wrapper.appendChild(document.body.firstChild)
      }
      document.body.appendChild(wrapper)
      document.body.style.margin = '0'
      document.body.style.padding = '0'
      document.body.style.overflow = 'hidden'
      wrapper.style.position = 'absolute'
      wrapper.style.transformOrigin = 'top left'
    }

    var widthRatio = window.innerWidth / width
    var heightRatio = window.innerHeight / height
    var scale = Math.min(widthRatio, heightRatio)

    const scaledWidth = width * scale
    const scaledHeight = height * scale
    const left = (window.innerWidth - scaledWidth) / 2
    const top = (window.innerHeight - scaledHeight) / 2

    wrapper.style.width = width + 'px'
    wrapper.style.height = height + 'px'
    wrapper.style.left = `${left}px`
    wrapper.style.top = `${top}px`
    wrapper.style.transform = `scale(${scale})`
  }

  function addResizeListener(width, height) {
    window.addEventListener('resize', function () {
      return rescale(width, height)
    })
  }

  function addDOMContentLoadedListener(width, height) {
    document.addEventListener('DOMContentLoaded', function () {
      return rescale(width, height)
    })
  }

  function polyfill(width, height) {
    if (!hasNativeSupport()) {
      addResizeListener(width, height)
    }
    if (document.readyState === 'loading') {
      addDOMContentLoadedListener(width, height)
    } else {
      rescale(width, height)
    }
  }

  FixedViewport.polyfill = polyfill
})(FixedViewport || (FixedViewport = {}))

FixedViewport.polyfill(1920, 1080)
