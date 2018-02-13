<template>
  <div>
    <scroller>
      <!-- <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(image, index) in slider" :key="index">
          <img v-lazy="image.picUrl" />
        </van-swipe-item>
      </van-swipe> -->
      <div v-show="songList.length">
        <!-- <h3 style="margin: 10px">QQ音乐热门歌单</h3> -->
        <ul class="list_container">
          <li v-for="(item, index) of songList"
              :key="index"
              @click="getCdInfo(item.id, item.type)"
              class="recom_songlist"
              :title="item.songListDesc">
            <img v-lazy="item.picUrl" alt="">
            <p class="songListDesc">{{ item.songListDesc }}</p>
            <p class="songListAuthor">{{ item.songListAuthor }}</p>
          </li>
        </ul>
      </div>
    </scroller>
    <blank-view title="歌单详情"
                :show.sync="showCdInfo"
                ref="cdInfo">
      <div style="margin: 0 10px">
        <img style="height: 250px; width: 100%" :src="selectedCD.logo" alt="">
        <van-panel :title="selectedCD.dissname">
          <p class="cd-info-desc" @click="triggerHeight()" :style="{ height: height }" v-html="selectedCD.desc"></p>
        </van-panel>
        <br>
        <van-cell-group>
          <van-cell @click.native="addToPlaylist()" title="播放全部歌曲" is-link />
        </van-cell-group>
        <br>
        <van-cell-group>
          <van-cell :title="song.songname"
                    :value="song.singername"
                    is-link
                    v-for="song of selectedCD.songlist"
                    :key="song.id"
                    @click.native="onItemClick(song, selectedCD.type)">
            <img slot="icon" class="music-icon" :src="types[selectedCD.type]" alt="">
          </van-cell>
        </van-cell-group>
      </div>
    </blank-view>
  </div>
</template>
<script>
import Music from '@/plugins/music'
import Playlist from '@/plugins/lowdb/playlist'
import Scroller from '@/components/scrollbar'
import BlankView from '@/components/blank-view'
export default {
  components: {
    Scroller,
    BlankView
  },
  data: () => ({
    showCdInfo: false,
    songList: [],
    selectedCD: { songlist: [] },
    height: '50px',
    types: {
      qq: require('@/assets/icons/qq.png'),
      netease: require('@/assets/icons/netease.jpg'),
      kuwo: require('@/assets/icons/kuwo.png'),
      kugou: require('@/assets/icons/kugou.jpeg')
    }
  }),
  async mounted () {
    await this.fetch()
  },
  methods: {
    triggerHeight () {
      if (this.height === 'auto') {
        this.height = '50px'
      } else {
        this.height = 'auto'
      }
    },
    async fetch () {
      this.$toast.loading({
        mask: true,
        duration: 0
      })
      for (let t of ['qq', 'netease', 'kuwo', 'kugou']) {
        try {
          const data = await Music[t].recommend()
          if (data) {
            this.songList.push.apply(this.songList, data.songList.map(i => ({
              ...i,
              type: t
            })))
          }
        } catch (error) {
          console.log(error)
        }
      }
      this.$toast.clear()
    },
    async getCdInfo (id, type) {
      this.$toast.loading({
        mask: true,
        duration: 0
      })
      try {
        const data = await Music[type].cdInfo(id)
        data.type = type
        this.selectedCD = data
        this.showCdInfo = true
        this.$refs.cdInfo.scrollTo()
      } catch (error) {
        this.$dialog.alert({
          message: error.message || '加载失败，请稍后再试'
        })
      } finally {
        this.$toast.clear()
      }
    },
    async onItemClick (item, type) {
      this.$toast.loading({
        mask: true,
        duration: 0
      })
      try {
        // console.log(item, type)
        // type = type || item.id.split('_')[0]
        const data = await Music[type].song(item.id)
        this.playSync(data)
      } catch (error) {
        this.$dialog.alert({
          message: error.message || '加载失败，请稍后再试'
        })
      } finally {
        this.$toast.clear()
      }
    },
    addToPlaylist () {
      const payload = this.selectedCD.songlist.map((i, index) => ({
        id: this.selectedCD.type + '_' + i.id,
        at: Date.now() + index
      }))
      Playlist.replace(payload)
      // this.$store.commit('SET_PLAYLIST', payload)
      // 替换播放列表
      this.startPlaylist(payload[0])
      this.showCdInfo = false
    },
    async startPlaylist (item) {
      try {
        const [type, id] = item.id.split('_')
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
<style lang="stylus" scoped>
.cd-info-desc
  background-color #eee
  line-height 25px
  font-size 14px
  padding 5px
  text-indent 12px
  color #9c9c9c
  border-radius 5px
  cursor pointer
  overflow hidden
.music-icon
  display inline-block
  height 20px
  width 20px
  margin-right 5px
  vertical-align: middle;

.list_container
  overflow: hidden;
  padding 5px 10px;
  display flex
  flex-wrap wrap
  justify-content space-between;
.recom_songlist
  width: calc(50% - 5px);
  margin-bottom: 10px;
  overflow: hidden;
  height 30vh
  display flex
  flex-direction column
  cursor pointer
  img
    flex: 1;
    height 0;
  .songListDesc, .songListAuthor
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  .songListDesc
    font-size 14px;
    margin 3px 0
  .songListAuthor
    font-size 12px;
    color #666
    margin 3px 0
</style>
