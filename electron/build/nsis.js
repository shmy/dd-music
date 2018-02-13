const { spawn } = require('child_process')
const { readFileSync, writeFileSync, unlinkSync } = require('fs')
const { encode } = require('iconv-lite')
const path = require('path')
const makensis = 'D:\\Program Files (x86)\\NSIS\\makensis.exe'

const getNsi = args => {
  /* eslint-disable no-template-curly-in-string */
  !args.output && (args.output = '${PRODUCT_OUTPUT_NAME}')
  let tmp = readFileSync(path.resolve(__dirname, './build_resources/tmp.nsi'), { encoding: 'utf-8' })
  tmp = tmp.replace('{{__FILEDIR__}}', args.filedir)
        .replace('{{__OUTPUT__}}', args.output)
  const nsi = path.resolve(__dirname, 'tmpfile-' + Date.now() + '.nsi')
  writeFileSync(nsi, encode(tmp, 'gbk'), null)
  return nsi
}

module.exports = async (args, exe = makensis) => new Promise((resolve, reject) => {
  {
    const nsi = getNsi(args)
    const process = spawn(exe, ['/NOCONFIG', nsi])
    process.stdout.on('data', (data) => {
      console.log(`[NSIS INFO]: ${data}`)
    })

    process.stderr.on('data', (data) => {
      console.log(`[NSIS ERROR]: ${data}`)
    })

    process.on('close', (code) => {
      resolve()
      unlinkSync(nsi)
      console.log(!code ? '成功！' : '失败！')
    })
  }
})
