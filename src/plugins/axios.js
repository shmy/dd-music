const { create } = require('axios')

const instance = create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://47.52.96.184:8111/client' : 'http://localhost:8111/client',
  timeout: 60000
})
instance.defaults.adapter = require('axios/lib/adapters/http')

module.exports = {
  install (Vue) {
    Object.defineProperties(Vue.prototype, {
      $http: {
        get () {
          return instance
        }
      }
    })
  },
  axios: instance
}
