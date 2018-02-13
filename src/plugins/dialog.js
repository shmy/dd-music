import { Dialog } from 'vant'

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$Dialog', {
      get () {
        return Dialog
      }
    })
  }
}
export const dialog = Dialog
