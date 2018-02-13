const path = require('path')
const { version } = require('../package.json')
// const { rebuild } = require('electron-rebuild')

module.exports = {
  // afterCopy: [(buildPath, electronVersion, platform, arch, callback) => {
  //   rebuild({ buildPath, electronVersion, arch })
  //     .then(() => callback())
  //     .catch((error) => callback(error));
  // }],
  // electron-packager options
  // Docs: https://simulatedgreg.gitbooks.io/electron-vue/content/docs/building_your_app.html
  name: 'dd-music',
  // Electron version
  electronVersion: require('../node_modules/electron/package.json').version,
  arch: ['ia32', 'x64'],
  // arch: ['x64'],
  asar: true,
  dir: path.join(__dirname, '../../dist'),
  icon: path.join(__dirname, '../icons/icon'),
  ignore: /\b(node_modules|src|icons)\b/,
  out: path.join(__dirname, '../dist', version),
  overwrite: true,
  platform: 'win32',
  // windows 元数据
  win32metadata: {
    // 管理员权限
    'requested-execution-level': 'requireAdministrator',
    // 版本信息
    'CompanyName': '点点音乐',
    'FileDescription': '点点音乐',
    'FileVersion': '1.0.0',
    'InternalName': 'dd-music.exe',
    'OriginalFilename': 'dd-music.exe',
    'LegalCopyright': `Copyright (C) ${new Date().getFullYear()} @ SHMY`,
    'ProductName': '点点音乐',
    'ProductVersion': '1.0.0',
    'SquirrelAwareVersion': '1'
  }
}
