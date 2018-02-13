const shell = require('shelljs')
const { version } = require('../package.json')
const nsis = require('./nsis')
const archiver = require('./archiver')
const path = require('path')
const patch = require('./patch')

const dir = path.join(__dirname, '../tmp/', version)
shell.rm('-rf', dir)
shell.mkdir(dir)
const releaseDir = path.join(__dirname, `../release/${version}`)
shell.rm('-rf', releaseDir)
shell.mkdir(releaseDir)

module.exports = async appPath => {
  const { name } = path.parse(appPath)
  const mdir = path.join(dir, './' + name)
  shell.mkdir(mdir)
  const subdir = path.join(mdir, './bin')
  shell.mkdir(subdir)
  shell.cp('-R', path.join(appPath, '/*'), subdir)
  // shell.mv(path.join(subdir, './dd-music.exe'), path.join(subdir, './launch.exe'))
  shell.cp(path.join(__dirname, `../src/update-${name}.exe`), path.join(mdir, './update.exe'))
  await nsis({
    filedir: mdir,
    output: path.join(releaseDir, `./${name}-${version}-installer.exe`)
  })
  await archiver(subdir, path.join(releaseDir, `./${name}-${version}-bundle.zip`))
  await patch([
    { path: path.join(subdir, './resources/app.asar'), name: 'resources/app.asar' }
  ], path.join(releaseDir, `./${name}-${version}-patch.zip`))
}