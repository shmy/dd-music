var
  shell = require('shelljs'),
  path = require('path'),
  { version } = require('../package.json')
console.log(path.resolve(__dirname, '../dist', version))
shell.rm('-rf', path.resolve(__dirname, '../dist', version))
console.log(' Cleaned Electron build artifacts.\n')
