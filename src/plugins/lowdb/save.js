import { cache } from './common'
import Storage from './storage'
import Download from './download'
import { join, sep } from 'path'

export default async (id, type) => {
  const ret = Storage.show({ id, type })
  if (ret.saved) {
    return
  }
  try {
    const [audio, image] = await Promise.all([
      Download(ret.url, join(cache, Date.now() + ret.ext)),
      ret.pic ? Download(ret.pic, join(cache, Date.now() + '.jpg')) : ''
    ])
    // 更新数据库
    Storage.update({ id, type }, {
      url: audio.split(sep).join('/'),
      pic: image ? image.split(sep).join('/') : '',
      saved: true
    })
    console.log('下载完毕', audio, image)
  } catch (error) {
    console.log('下载失败')
  }
}
