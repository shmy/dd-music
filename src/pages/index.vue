<template>
  <div class="fit column">
    <header-tab :route="$route.path"
                :style="styleObj" />
    <keep-alive>
      <router-view class="tab-view" />
    </keep-alive>
    <music-tool-bar @detail-click="$refs.playCenter.show = true"
                    @download="onDownload()"
                    @open-playlist="onOpenPlaylist()"
                    :music="music"/>
    <play-center ref="playCenter"
                 :style="styleObj"
                 :music="music"
                 @favorite="onFavorite()"
                 @next="onEnded()"
                 @prev="onPrev()" />
    <a ref="download" style="display: none"></a>
  </div>
</template>
<script>
import Music from '@/plugins/music'
import { mapState } from 'vuex'
import LrcWindow from '@/plugins/lrc-window'
import HeaderTab from '@/components/header-tab'
import Db from '@/plugins/lowdb'
// import History from '@/plugins/lowdb/history'
// import Playlist from '@/plugins/lowdb/playlist'
// import Storage from '@/plugins/lowdb/storage'
import MusicToolBar from '@/components/music-tool-bar'
import PlayCenter from '@/components/play-center'
export default {
  components: {
    HeaderTab,
    MusicToolBar,
    PlayCenter
  },
  computed: {
    ...mapState({
      music: state => state.song
    }),
    styleObj () {
      return {
        backgroundColor: this.music.primary,
        color: this.music.font
      }
    }
  },
  mounted () {
    let playlist = Db.Playlist.all()
    if (!playlist.length) {
      playlist = Db.Playlist.replace(Db.History.all())
    }
    // this.$store.commit('SET_PLAYLIST', playlist)
    if (playlist.length) {
      this.readyPlay(playlist[0])
    }
    this.$hub.on('timeupdate', this.onTimeUpdate)
    this.$hub.on('loadstart', this.onLoadStart)
    this.$hub.on('ended', this.onEnded)
  },
  methods: {
    onTimeUpdate (target) {
      this.$refs.playCenter.currentTime = target.currentTime
      LrcWindow.send({ type: 'timeupdate', data: target.currentTime })
    },
    onLoadStart (target) {
      this.$refs.playCenter.totalTime = target.duration
      LrcWindow.send({ type: 'set-lyric', data: this.music.lrc })
      Db.Storage.doCache(this.music.id)
    },
    onPrev () {
      const prev = Db.Playlist.prev(this.music.id)
      prev && this.readyPlay(prev)
    },
    onEnded () {
      const next = Db.Playlist.next(this.music.id)
      next && this.readyPlay(next)
    },
    onFavorite () {
      if (!this.music.id) {
        return this.$toast.fail('没有歌曲可以收藏哦！')
      }
      Db.Favorite.create(this.music.id)
      this.$toast.success('收藏成功！')
    },
    onDownload () {
      if (!this.music.id) {
        return this.$toast.fail('没有歌曲可以下载哦！')
      }
      const download = this.$refs.download
      download.href = this.music.url
      download.download = `${this.music.songname}-${this.music.singername}`
      download.click()
    },
    onOpenPlaylist () {
      this.$toast.success('敬请期待')
    },
    async readyPlay (item) {
      if (!item) return
      const [type, id] = item.id.split('_')
      this.$toast.loading({
        mask: true,
        duration: 0
      })
      try {
        const data = await Music[type].song(id)
        this.playSync(data)
      } catch (error) {
        this.$dialog.alert({
          message: error.message || '加载失败，请稍后再试'
        })
      } finally {
        this.$toast.clear()
      }
    }
  }
}
</script>
<style scoped>
.tab-view {
  height: calc(100vh - 75px - 67px) !important;
  position: relative;
  top: 0;
  left: 0;
}
</style>
