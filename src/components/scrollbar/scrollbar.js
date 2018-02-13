import Scrollbar from 'smooth-scrollbar'
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll'

Scrollbar.use(OverscrollPlugin)
const options = {
  damping: 0.1,
  thumbMinSize: 20,
  renderByPixels: true,
  alwaysShowTracks: false,
  continuousScrolling: true
}
const overscrollOptions = {
  enable: true,
  // effect: navigator.userAgent.match(/Android/) ? 'glow' : 'bounce',
  effect: 'glow',
  damping: 0.2,
  maxOverscroll: 150,
  glowColor: '#222a2d'
}
export default el => {
  return Scrollbar.init(el, {
    ...options,
    plugins: {
      overscroll: overscrollOptions
    }
  })
}
