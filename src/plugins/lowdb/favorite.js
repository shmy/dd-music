import Common from './common'
import Storage from './storage'
class Favorite extends Common {
  constructor () {
    super('favorite')
    this.db.defaults({
      [this.name]: []
    })
      .write()
  }
  all (flag = 1) {
    const result = this.db.get(this.name)
      .sortBy(i => flag === 1 ? i.at : -i.at)
      .value()
    return this._clone(result)
  }
  create (id) {
    const item = {
      id,
      at: Date.now()
    }
    let result = this.db.get(this.name)
      .find({ id: item.id })
      .value()
    if (!result) {
      this.db.get(this.name)
        .push(item)
        .write()
      result = item
    } else {
      result = super.update({ id: item.id }, { at: Date.now() })
    }
  }
  list (page = 1, perPage = 20) {
    const base = this.db.get(this.name)
      .filter(item => !!item.at)
    const result = {
      total: base.size().value(),
      data: base
        .sortBy([i => -i.at]) // 倒序
        .splice((page - 1) * perPage, perPage)
        .value()
        .map(item => {
          const sta = Storage.show(item.id)
          return sta
        })
    }
    return this._clone(result)
  }
}
export default new Favorite()
