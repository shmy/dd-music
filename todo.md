### 歌曲结果缓存本地 --ok
优化取色逻辑 否则图片失败就挂了 不能播放
### QQ推荐
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1517564314693

## QQ排行
https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1517564382364

## QQ歌手

https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&g_tk=5381&jsonpCallback=GetSingerListCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0

统一错误处理 catch

接入sql.js 创建表

hub.js 做全局事件 --ok
使用原生的 窗口通信 --ok
桌面歌词的打开状态在重启之后不会保存 生产环境 --ok
缓存图片的base64 不要缓存音乐链接， 或者 缓存到本地 --ok
把热门搜索用socp-slot嵌进去 --ok

version
electron-version

循环播放 --ok
播放一首歌 添加到 song表 然后下载 再保存到 res表 --ok
收藏 直接给定song的ID --ok
历史 每次播放一首 就放一首在前面 --ok

更换图标