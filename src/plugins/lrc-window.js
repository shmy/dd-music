import { remote, screen } from 'electron'
const { width, height } = screen.getPrimaryDisplay().workAreaSize
const root = remote.app.getAppPath()

class LrcWindow {
  constructor () {
    this.win = null
    this.lrc = ''
  }
  open () {
    if (this.win) return Promise.resolve(this.win)
    return new Promise((resolve, reject) => {
      this.win = new remote.BrowserWindow({
        width,
        height: 100,
        x: 0,
        y: height - 150,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        show: false
      })
      this.win.setIgnoreMouseEvents(true)
      this.win.loadURL(process.env.NODE_ENV === 'production'
        ? `file://${root}/lrc.html`
        : `http://localhost:5000/lrc.html`)
      this.win.once('ready-to-show', () => {
        this.init()
        this.win.show()
        resolve()
      })
    })
  }
  close () {
    this.win && this.win.close()
    this.win = null
    return Promise.resolve()
  }
  init () {
    this.send({
      type: 'set-lyric',
      data: this.lrc
    })
  }
  send (data) {
    if (data.type === 'set-lyric') {
      this.lrc = data.data
    }
    if (this.win) {
      this.win.send('ping', data)
    }
  }
}

export default new LrcWindow()
