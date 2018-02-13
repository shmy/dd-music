process.env.NODE_ENV = 'production'

require('colors')

var { version } = require('../package.json'),
  packager = require('electron-packager'),
  shell = require('shelljs'),
  path = require('path'),
  fs = require('fs'),
  config = require('../config/electron'),
  targetPath = path.join(__dirname, '../../dist'),
  webpackBuild = require('./webpack.builder.js'),
  ready = require('./ready'),
  ora = require('ora')

if (!fs.existsSync(targetPath)) {
  console.error('Please build your App before packaging for Electron...'.red)
  console.error('Issue "quasar build"'.red + ' from the root folder of your project'.gray + ' to make the build then try again.'.red)
  process.exit(1)
}

webpackBuild(function () {
  shell.cp(path.join(__dirname, '../dist/electron.js'), targetPath)
  shell.cp(path.join(__dirname, '../package.json'), targetPath)

  console.log(' Building Electron app(s)...\n'.bold)
  packager(config, async (err, appPaths) => {
    if (err) {
      console.error('Error from `electron-packager` when building app...'.red)
      console.error(err)
      return
    }
    return
    for (let appPath of appPaths) {
      await ready(appPath)
    }
  })
})
