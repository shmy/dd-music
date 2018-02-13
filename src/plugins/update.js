const { remote } = require('electron')
const { toast } = require('./toast')
const { dialog } = require('./dialog')
const { join, dirname } = require('path')
const { spawn } = require('child_process')
const { createWriteStream } = require('fs')
const { axios: http } = require('./axios')
const app = remote.app
const appPath = dirname(app.getPath('exe'))
const updatePath = join(appPath, '../update.exe')
const currentVersion = +app.getVersion().replace(/\./g, '')
const electronVersion = +remote.process.versions.electron.replace(/\./g, '')
const platform = remote.process.platform
const cmds = {
  win32: 'cmd.exe',
  darwin: 'bash'
}
const execUpdateProg = (url, dir) => {
  // 防止空格等特殊符号 使用双引号进行包裹
  const pid = remote.process.pid
  const child = spawn(`"${updatePath}"`, [
    `-pid="${pid}"`,
    `-url="${url}"`,
    `-dir="${appPath}"`
  ],
  {
    shell: cmds[platform],
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore']
  })
  child.unref()
  app.exit(0)
}
const fetch = async () => {
  const { data } = await http.get('/update')
  return data
}
const download = url => {
  const patchPath = join(appPath, '../patch.zip')
  return new Promise((resolve, reject) => {
    http.get(url, {
      responseType: 'stream'
    })
      .then(({ data }) => {
        data.pipe(createWriteStream(patchPath))
        data.on('end', () => resolve(patchPath))
      })
  })
}
const update = async (bundleUrl, detail) => {
  const patchPath = await download(bundleUrl)
  dialog.confirm({
    title: '点点音乐需要重启以更新',
    message: `更新已经下载完毕，是否立即重启以更新？<br>${detail}`
  }).then(() => {
    execUpdateProg(patchPath, appPath)
  })
}
const check = (isSilent = false) => {
  return new Promise(async (resolve, reject) => {
    const _package = await fetch()
    const latestElectronVersion = +_package.electronVersion.replace(/\./g, '')
    const latestVersion = +_package.version.replace(/\./g, '')
    // 设置最后检查时间
    window.localStorage.setItem('lastchecktime', Math.floor(Date.now() / 1000))
    let bundleUrl = null
    if (electronVersion < latestElectronVersion) {
      // 平台 + 架构
      // 此处直接更新 electron 基础包
      bundleUrl = _package.bundle[platform] ? _package.bundle[platform][remote.process.arch] : null
    } else if (currentVersion < latestVersion && _package.patchUrl) {
      // 此处只更新app.asar
      bundleUrl = _package.patchUrl
    }
    if (bundleUrl) {
      const detail = `发布日期：${_package.publish_at}<br>版本编号：v${_package.version}<br>更新内容：<br>- ${_package.detail.join('<br>- ')}<br>`
      if (!isSilent) {
        return dialog.confirm({
          title: '发现点点音乐新版本',
          message: `${detail}是否立即下载？`
        }).then(() => {
          update(bundleUrl, detail)
        })
      }
      update(bundleUrl, detail)
    } else {
      !isSilent && toast.success('当前已是最新版本')
    }
  })
}

module.exports = {
  check,
  update
}
