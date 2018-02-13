import defaultPic from '@/assets/music.png'
import { cache } from '@/plugins/lowdb/cache'
import { join } from 'path'

export default {
  data: () => ({
    playing: false,
    currentTime: 0,
    totalTime: 0,
    loading: false
  }),
  filters: {
    timeProcess (time) {
      var minute = ~~(time / 60)
      var seconds = ~~(time % 60)
      return (minute > 9 ? minute : '0' + minute) + ':' + (seconds > 9 ? seconds : '0' + seconds)
    }
  },
  mounted () {
    this.$hub.on('loadeddata', data => {
      this.totalTime = data.duration
    })
    this.$hub.on('timeupdate', data => {
      this.currentTime = data.currentTime
    })
    this.$hub.on('playing', data => {
      this.playing = true
      this.loading = false
    })
    this.$hub.on('pause', data => {
      this.playing = false
      this.loading = false
    })
    this.$hub.on('loadstart', data => {
      this.loading = true
    })
    this.$hub.on('waiting', data => {
      this.loading = true
    })
  },
  methods: {
    triggerPlay () {
      if (!this.playing) {
        return this.$hub.emit('play')
      }
      this.$hub.emit('stop')
    },
    setCurrentTime (time) {
      this.$hub.emit('jump', time)
    },
    resolvePic (val) {
      if (!val) {
        return defaultPic
      }
      if (!val.startsWith('http')) {
        return join(cache, val).replace(/\\/g, '/')
      }
      return val
    }
  }
}
