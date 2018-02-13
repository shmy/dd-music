import Db from '@/plugins/lowdb'
import Rgbaster from '@/plugins/rgbaster'
import * as KuWo from '@shmy/musicbox/platform/kuwo'

const Storage = Db.Storage

export default class extends KuWo {
  constructor (...args) {
    super(...args)
    this.type = 'kuwo'
  }
  song(id) {
    const localId = this.type + '_' + id
    const result = Storage.show(localId)
    // 先从本地读取
    if (result) {
      return Promise.resolve(result)
    }
    return new Promise((resolve, reject) => {
      super.song(id)
        .then(async result => {
          // 读取色调
          let colors = {
            primary: '#fff',
            font: '#000'
          }
          if (result.pic) {
            colors = await Rgbaster(result.pic)
          } 
          result = Object.assign(result, colors, {
            id: localId
          })
          // 存入Storage
          resolve(Storage.create(result))
        })
        .catch(reject)
    })
  }
}
