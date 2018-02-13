/* global RGBaster */
import 'rgbaster'
export default img => new Promise((resolve, reject) => {
  RGBaster.colors(img, {
    paletteSize: 30,
    success (payload) {
      const c = payload.dominant.match(/\d+/g)
      const primary = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 1)`
      let font = '#fff'
      const grayLevel = c[0] * 0.299 + c[1] * 0.587 + c[2] * 0.114
      if (grayLevel >= 192) {
        // 若为浅色，把文字设置为黑色
        font = '#000'
      }
      resolve({ primary, font })
    }
  })
})
