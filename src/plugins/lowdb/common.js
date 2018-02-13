const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const { remote: { app } } = require('electron')
const { join, dirname } = require('path')
const { mkdirSync } = require('fs')
const appPath = dirname(app.getPath('exe'))
const dbDir = join(appPath, '../.db/')

try {
  mkdirSync(dbDir)
} catch (error) {
  if (error.code !== 'EEXIST') {
    throw error
  }
}

export default class {
  constructor (dbName) {
    const adapter = new FileSync(join(dbDir, dbName + '.db'), {
      serialize: JSON.stringify
    })
    this.db = low(adapter)
    this.name = 'main'
  }
  _clone (v) {
    return JSON.parse(JSON.stringify(v))
  }
  all () {
    const result = this.db.get(this.name)
      .value()
    return this._clone(result)
  }
  show (id) {
    const result = this.db.get(this.name)
      .find({ id })
      .value()
    return result ? this._clone(result) : null
  }
  create (item) {
    let result = this.db.get(this.name)
      .find({ id: item.id })
      .value()
    if (!result) {
      this.db.get(this.name)
        .push(item)
        .write()
      result = item
    }
    return this._clone(result)
  }
  update (con, payload) {
    this.db.get(this.name)
      .find(con)
      .assign(payload)
      .write()
  }
  destroy (id) {
    this.db.get(this.name)
      .remove({ id })
      .write()
  }
}
