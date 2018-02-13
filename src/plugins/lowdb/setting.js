import Common from './common'
class Setting extends Common {
  constructor () {
    super('setting')
    this.db.defaults({
      [this.name]: {
        lrcWindow: false
      }
    })
      .write()
  }
  update (payload) {
    this.db.get(this.name)
      .assign(payload)
      .write()
  }
}
export default new Setting()
