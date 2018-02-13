
const { createWriteStream } = require('fs')

const archiver = require('archiver')

module.exports = (src, target) => new Promise((resolve, reject) => {
  const output = createWriteStream(target)
  const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
  })
  output.on('close', () => {
    resolve()
    console.log('patch打包完成：', archive.pointer() + ' total bytes')
  })
  output.on('error', error => reject(error))
  archive.pipe(output)
  // archive.directory(src, false)
  for (let item of src) {
    archive.file(item.path, { name: item.name })
  }
  archive.finalize()
})
