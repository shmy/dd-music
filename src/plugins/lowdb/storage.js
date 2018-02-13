import Common from './common'
import Download from './download'
import { parse } from 'path'
import { getFilePath } from './cache'
import { writeFileSync } from 'fs'

class Storage extends Common {
  constructor () {
    super('storage')
    this.db.defaults({
      [this.name]: []
    })
      .write()
  }
  create (item) {
    item = JSON.parse(JSON.stringify(item))
    item.lrc = item.lrc.trim()
    if (item.lrc) {
      // 保存歌词文件
      const [fullPath, shortPath] = getFilePath('lrc')
      writeFileSync(fullPath, item.lrc, { encoding: 'utf8' })
      item.lrc = shortPath
    }
    return super.create(item)
  }
  doCache (id) {
    const item = this.show(id)
    if (item) {
      if (item.url.startsWith('http')) {
        const mp3 = parse(item.url.split('?')[0])
        const [mp3FullPath, mp3ShortPath] = getFilePath(mp3.ext.replace('.', ''))
        const [picFullPath, picShortPath] = getFilePath('jpg')
        // 缓存到本地
        const p = [Download(item.url, mp3FullPath)]
        if (item.pic) {
          p.push(Download(item.pic, picFullPath))
        }
        Promise.all(p)
          .then(([mp3, pic]) => {
            this.update({ id }, { url: mp3ShortPath })
            pic && this.update({ id }, { pic: picShortPath })
          })
          .catch(e => console.log(e))
      }
    }
  }
}
export default new Storage()
