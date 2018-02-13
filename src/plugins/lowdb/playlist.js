import Common from './common'

class Playlist extends Common {
  constructor () {
    super('playlist')
    this.db.defaults({
      [this.name]: []
    })
      .write()
  }
  next (id) {
    // 找到当前列表的index
    const con = this.db.get(this.name)
    // .sortBy([i => -i.at])
    const index = con.findIndex(e => e.id === id)
      .value()
    let result = con.nth(index + 1)
      .value()
    // 没有下一首 播放第一首
    if (!result) {
      result = con.nth(0)
        .value()
    }
    return result ? this._clone(result) : null
  }
  prev (id) {
    // 找到当前列表的index
    const con = this.db.get(this.name)
    const index = con.findIndex(e => e.id === id)
      .value()
    let result = con.nth(index - 1)
      .value()
    return result ? this._clone(result) : null
  }
  replace (payload) {
    this.db.setState({[this.name]: payload}).write()
    return this._clone(payload)
  }
}
export default new Playlist()
