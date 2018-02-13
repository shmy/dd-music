import { Toast } from 'vant'

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$toast', {
      get () {
        return Toast
      }
    })
  }
}
export const toast = Toast
