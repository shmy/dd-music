const { remote: { app } } = require('electron')
const { join, dirname, sep } = require('path')
const { mkdirSync } = require('fs')

const appPath = dirname(app.getPath('exe'))
export const cache = join(appPath, '../.cache/')
try {
  mkdirSync(cache)
} catch (error) {
  if (error.code !== 'EEXIST') {
    throw error
  }
}

const getCurrentDir = () => {
  const date = new Date()
  const year = date.getFullYear() + ''
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month + ''

  let dir = join(cache, year)
  try {
    mkdirSync(dir)
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
  dir = join(dir, month)
  try {
    mkdirSync(dir)
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
  return dir
}

export const getFilePath = ext => {
  const fullPath = join(getCurrentDir(), `${Date.now()}.${ext}`)
  const shortPath = fullPath.replace(cache, '').split(sep).join('/')
  return [fullPath, shortPath]
}
