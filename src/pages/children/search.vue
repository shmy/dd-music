<template>
  <!-- <div style="height: calc(100vh - 75px - 67px) !important;"> -->
  <div>
    <search-bar @input="onInput($event)"
                v-model="keyword"
                @type-change="typeChange($event)"
                ref="searchBar"
                :style="{ backgroundColor: primary, color: font }" />
    <scroller ref="scroller"
              @load="onLoadMore($event)"
              :load="!!list.length"
              style="height: calc(100% - 40px) !important;">
      <template v-if="list.length">
        <p class="search-item"
           v-for="(item, index) of list"
           :key="index"
           @click="onItemClick(item)">
          {{ item.songname }}-{{ item.singername }}
        </p>
      </template>
      <div v-else
         slot="extend"
         style="padding: 10px">
        <h3 v-show="hotkey.length" style="margin: 8px 0;font-weight: 400">热门搜索</h3>
        <div>
          <van-button size="small" class="hotkey-tag"
              @click="$refs.searchBar.setValue(item)"
              :key="index"
              v-for="(item, index) of hotkey">
              {{ item }}
          </van-button>
        </div>
      </div>
    </scroller>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import Music from '@/plugins/music'
import Scroller from '@/components/scrollbar'
import SearchBar from '@/components/search-bar'
export default {
  computed: {
    ...mapState({
      primary: state => state.song.primary,
      font: state => state.song.font
    })
  },
  components: {
    Scroller,
    SearchBar
  },
  data: () => ({
    keyword: '',
    type: 'qq',
    page: 1,
    per_page: 20,
    list: [],
    total: 2,
    loading: false,
    hotkey: []
  }),
  async activated () {
    const hotkey = await Music.qq.hotKey()
    this.hotkey = hotkey.slice(0, 12)
    // Music.qq.hotKey()
  },
  methods: {
    async onItemClick (item) {
      this.$toast.loading({
        mask: true,
        duration: 0
      })
      try {
        const data = await Music[this.type].song(item.id)
        this.playSync(data)
      } catch (error) {
        this.$dialog.alert({
          message: error.message
        })
      } finally {
        this.$toast.clear()
      }
    },
    async onInput () {
      this.page = 1
      this.$refs.scroller.scrollTo(0, 0, 300)
      this.$refs.scroller.reset()
      await this.search()
    },
    async typeChange (val) {
      this.page = 1
      this.type = val
      this.$refs.scroller.scrollTo(0, 0, 300)
      this.$refs.scroller.reset()
      await this.search()
    },
    async search (append = false) {
      if (!this.keyword) {
        this.list = []
        return
      }
      this.loading = true
      try {
        const data = await Music[this.type].search(this.keyword, this.page, this.perPage)
        this.page = data.page
        this.per_page = data.per_page
        this.total = data.total
        if (append) {
          this.list.push.apply(this.list, data.list)
        } else {
          this.list = data.list
        }
        this.$refs.scroller.endBySize(this.total)
      } catch (error) {
        if (!append) {
          this.list = []
        }
        this.$toast.fail(error.message)
        this.$refs.scroller.endError()
      } finally {
        this.loading = false
      }
    },
    async onLoadMore ({ endBySize }) {
      if (this.loading) {
        return
      }
      this.page++
      await this.search(1)
      // endBySize(this.total)
    }
  }
}
</script>
<style lang="stylus" scoped>
.search-item {
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  font-size: 14px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::before {
    content: ' ';
    position: absolute;
    height: 1px;
    top: 0;
    left: 0;
    right: 0;
    background: #e5e5e5;
    transform: scaleY(0.5);
  }
}
.hotkey-tag {
  margin: 5px;
  cursor pointer
}
</style>
