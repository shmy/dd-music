'use strict'

const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const setFocus = () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
}
let mainWindow
// 保持单例运行
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  setFocus()
})
if (shouldQuit) {
  app.quit()
}
function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 320,
    height: 550,
    minWidth: 320,
    minHeight: 550,
    show: false,
    icon: process.env.NODE_ENV === 'production' ? path.resolve(__dirname, './statics/icon.ico') : '',
    useContentSize: true,
    frame: false,
    // resizable: true,
    resizable: process.env.NODE_ENV !== 'production',
    webPreferences: { webSecurity: false } // 忽略安全策略
    // webPreferences: { webSecurity: false, allowRunningInsecureContent: true } // 忽略安全策略 支持跨域
  })

  // 闪屏事件
  mainWindow.on('focus', () => mainWindow.flashFrame(false))
  mainWindow.once('ready-to-show', () => mainWindow.show())

  mainWindow.loadURL(
    process.env.NODE_ENV === 'production'
      ? `file://${__dirname}/index.html`
      : `http://localhost:${process.env.PORT || require('../../config').dev.port}`
  )

  if (process.env.NODE_ENV === 'development') {
    BrowserWindow.addDevToolsExtension(path.join(__dirname, '../node_modules/devtron'))

    let installExtension = require('electron-devtools-installer')

    installExtension.default(installExtension.VUEJS_DEVTOOLS)
      .then(name => mainWindow.webContents.openDevTools())
      .catch(err => console.log('An error occurred: ', err))
    mainWindow.webContents.openDevTools()
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
