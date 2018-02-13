<template>
  <common-modal :show.sync="show">
    <van-nav-bar :title="title"
                 left-text="返回"
                 left-arrow
                 @click-left="$emit('update:show', false)" />
    <scroller class="scroller"
              :load="true"
              ref="scroller"
              @load="onLoad($event)">
      <van-cell-group v-show="musics.length">
        <van-cell @click.native="addToPlaylist()"
                  title="播放全部歌曲"
                  is-link />
      </van-cell-group>
      <br>
      <template v-if="musics.length">
        <van-cell-group>
          <van-cell :title="song.songname"
                    :value="song.singername"
                    is-link
                    v-for="song of musics"
                    :key="song.id"
                    @click.native="$emit('play', song)">
            <img slot="icon" class="music-icon" :src="types[song.id.split('_')[0]]" alt="">
          </van-cell>
        </van-cell-group>
        <!-- <p class="music-item"
           v-for="(item, index) of musics"
           :key="index"
           @click="$emit('play', $clone(item))">
          {{ index + 1 }}.
          <img :src="types[item.type]" alt="">
          {{ item.songname }}-{{ item.singername }}
        </p> -->
      </template>
      <p v-else>
        暂无数据</p>
      <!-- <div style="height: 100px"></div> -->
    </scroller>
  </common-modal>
</template>
<script>
import Music from '@/plugins/music'
import CommonModal from '@/components/common-modal'
import Scroller from '@/components/scrollbar'
import Db from '@/plugins/lowdb'

export default {
  name: 'music-view',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '播放历史'
    },
    method: {
      type: String,
      default: 'History'
    }
  },
  components: {
    CommonModal,
    Scroller
  },
  data: () => ({
    musics: [],
    page: 1,
    types: {
      qq: require('./icons/qq.png'),
      netease: require('./icons/netease.jpg'),
      kuwo: require('./icons/kuwo.png'),
      kugou: require('./icons/kugou.jpeg')
    }
  }),
  watch: {
    show (val) {
      if (val) {
        this.page = 1
        this.$refs.scroller.reset()
        const { data: musics, total } = Db[this.method].list(this.page)
        this.musics = musics
        this.$refs.scroller.scrollTo(0, 0, 300)
        this.$refs.scroller.endBySize(total)
      }
    }
  },
  methods: {
    onLoad ({ endBySize }) {
      this.page++
      const { data: musics, total } = Db[this.method].list(this.page)
      this.musics.push.apply(this.musics, musics)
      endBySize(total)
    },
    addToPlaylist () {
      const payload = Db[this.method].all(-1).map((i, index) => ({
        id: i.id,
        at: Date.now() + 1
      }))
      Db.Playlist.replace(payload)
      this.startPlaylist(payload[0])
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
.scroller {
  height: calc(100% - 46px) !important;
  background-color: white;
  color: black;
}
.music-icon
  display inline-block
  height 20px
  width 20px
  margin-right 5px
  vertical-align: middle;
// .music-item {
//   height: 40px;
//   display flex
//   align-items center
//   padding: 0 10px;
//   font-size: 14px;
//   position: relative;
//   cursor: pointer;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
//   img {
//     display inline-block
//     height 20px
//     width 20px
//     margin 0 5px
//   }
//   &::before {
//     content: ' ';
//     position: absolute;
//     height: 1px;
//     top: 0;
//     left: 0;
//     right: 0;
//     background: #e5e5e5;
//     transform: scaleY(0.5);
//   }
// }
</style>
