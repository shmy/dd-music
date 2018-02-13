import $hub from 'hub-js'
import { cache } from './lowdb/cache'
const { join } = require('path')
const ad = new window.Audio()

ad.addEventListener('loadstart', function () {
  $hub.emit('loadstart', this)
})
ad.addEventListener('loadeddata', function () {
  $hub.emit('loadeddata', this)
})
ad.addEventListener('playing', function () {
  $hub.emit('playing', this)
})
ad.addEventListener('timeupdate', function () {
  $hub.emit('timeupdate', this)
})
ad.addEventListener('pause', function () {
  $hub.emit('pause', this)
})
ad.addEventListener('waiting', function () {
  $hub.emit('waiting', this)
})
ad.addEventListener('ended', function () {
  $hub.emit('ended', this)
})

const setSrc = (src) => {
  if (!src.startsWith('http:')) {
    src = join(cache, src)
  }
  ad.src = src
  ad.load()
}
const play = () => {
  ad.play()
}
const stop = () => {
  ad.pause()
}
const jump = (time) => {
  ad.currentTime = time
}

$hub.on('play', data => {
  if (data) {
    setSrc(data)
  }
  play()
})
$hub.on('stop', () => {
  stop()
})
$hub.on('jump', (time) => {
  jump(time)
})

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$hub', {
      get () {
        return $hub
      }
    })
  }
}
