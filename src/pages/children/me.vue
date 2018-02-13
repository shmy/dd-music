<template>
  <div>
    <scroller>
      <h5 class="block-title">常用</h5>
      <van-cell-group>
        <van-cell title="收藏列表"
                  is-link
                  label="显示我收藏的歌曲列表"
                  icon="like"
                  @click="showFavoriteView = true" />
        <van-cell title="播放历史"
                  is-link
                  label="显示最近播放过的歌曲列表"
                  icon="underway"
                  @click="showHistroyView = true" />
      </van-cell-group>
      <h5 class="block-title">设置</h5>
      <van-cell-group>
        <van-switch-cell v-model="checked"
                         :loading="showLrcWindowLoading"
                         @change="onChange($event)"
                         title="开启桌面歌词显示" />
      </van-cell-group>
      <h5 class="block-title">其它</h5>
      <van-cell-group>
        <van-cell title="打赏"
                  is-link
                  label="请我喝杯咖啡"
                  icon="value-card"
                  @click="showDonateView = true" />
        <van-cell title="分享"
                  is-link
                  label="把点点音乐推荐给朋友们"
                  icon="share"
                  @click="showShareView = true" />
        <van-cell title="关于"
                  is-link
                  label="关于点点音乐"
                  icon="fail"
                  @click="showAboutView = true" />
      </van-cell-group>
    </scroller>
    <history-view :show.sync="showHistroyView"
                  @play="onPlay($event)" />
    <history-view title="我的收藏"
                  method="Favorite"
                  :show.sync="showFavoriteView"
                  @play="onPlay($event)" />
    <blank-view title="打赏作者"
                :show.sync="showDonateView">
      <p class="block-content center">开发不易，维护更艰。</p>
      <p class="block-content center">与你相识，点点之幸。</p>
      <p class="block-content center">点滴施舍，感激不尽。</p>
      <p class="block-content center">若有此举，没齿难忘。</p>
      <div class="block-content center"
           :key="index"
           v-for="(qrcode, index) of qrcodes">
        <p class="block-content center">- 使用{{ qrcode.label }}打赏 -</p>
        <img :src="qrcode.image"
             class="qrcode"
             alt="">
      </div>
    </blank-view>
    <blank-view title="推荐给朋友们"
                :show.sync="showShareView">
      <p class="block-content">推荐点点音乐给朋友们，一起免费听歌。</p>
      <div style="margin: 0 10px">
        <van-button type="danger" @click="share()" size="large">复制推荐消息到剪切板</van-button>
      </div>
    </blank-view>
    <blank-view title="关于"
                :show.sync="showAboutView">
      <p class="block-content" style="text-indent: 32px">点点音乐是一款免费的音乐播放软件，支持在线搜索并播放，边播边缓存，桌面歌词等功能。</p>
      <p class="block-content center">当前版本：v {{ currentVersion }}</p>
      <div style="margin: 0 10px">
        <van-button type="danger" @click="checkUpdate()" size="large">立即检查更新</van-button>
      </div>
    </blank-view>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { remote, clipboard } from 'electron'
import LrcWindow from '@/plugins/lrc-window'
import { check } from '@/plugins/update'
import Scroller from '@/components/scrollbar'
import Setting from '@/plugins/lowdb/setting'
// import Playlist from '@/plugins/lowdb/playlist'
// import Storage from '@/plugins/lowdb/storage'
import HistoryView from '@/components/history-view'
import BlankView from '@/components/blank-view'
export default {
  computed: {
    ...mapState({
      lrcWindow: state => state.setting.lrcWindow
    })
  },
  components: {
    Scroller,
    HistoryView,
    BlankView
  },
  data () {
    return {
      showFavoriteView: false,
      showHistroyView: false,
      showDonateView: false,
      showShareView: false,
      showAboutView: false,
      checked: this.lrcWindow,
      showLrcWindowLoading: false,
      qrcodes: [
        { label: '微信', image: require('@/assets/qrcode/wechat.jpg') },
        { label: '支付宝', image: require('@/assets/qrcode/alipay.jpg') }
      ],
      currentVersion: remote.app.getVersion()
    }
  },
  created () {
    this.checked = this.lrcWindow
  },
  methods: {
    onPlay (item) {
      this.playSync(item)
    },
    async onChange () {
      const store = { lrcWindow: this.checked }
      Setting.update(store)
      this.$store.commit('SET_SETTING_BY', store)
      this.showLrcWindowLoading = true
      const met = this.checked ? 'open' : 'close'
      await LrcWindow[met]()
      this.showLrcWindowLoading = false
    },
    checkUpdate () {
      check()
    },
    share () {
      clipboard.writeText('推荐给你一个高颜值的听歌软件 => 点点音乐，想听就听，汇聚全网音乐，永久免费听歌，点击下载：\nhttp://47.52.96.184:8111')
      this.$toast.success('消息已复制到剪贴板，快去粘贴分享吧！')
    }
  }
}
</script>
<style lang="stylus" scoped>
.block-title {
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  color: rgba(69, 90, 100, 0.6);
  padding: 20px 15px 10px;
}

.block-content {
  padding: 10px;
  line-height: 25px;
  &.center {
    text-align: center;
  }
}

.qrcode {
  display: inline-block;
  height: 240px;
  width: 240px;
}
</style>
