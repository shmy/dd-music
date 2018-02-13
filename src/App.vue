<template>
  <div id="app">
    <mac-os-title-bar @minimize="onMinimize()"
                      @close="onClose()"
                      :style="styleObj" />
    <router-view />
  </div>
</template>
<script>
import { remote } from 'electron'
import { mapState } from 'vuex'
import Setting from '@/plugins/lowdb/setting'
import LrcWindow from '@/plugins/lrc-window'
import MacOsTitleBar from '@/components/mac-os-title-bar'
const win = remote.getCurrentWindow()
export default {
  components: {
    MacOsTitleBar
  },
  computed: {
    ...mapState({
      primary: state => state.song.primary,
      font: state => state.song.font,
      lrcWindow: state => state.setting.lrcWindow
    }),
    styleObj () {
      return {
        backgroundColor: this.primary,
        color: this.font
      }
    }
  },
  mounted () {
    this.$store.commit('SET_SETTING', Setting.all())
    if (this.lrcWindow) {
      LrcWindow.open()
    }
  },
  methods: {
    onMinimize () {
      win.minimize()
    },
    onClose () {
      remote.app.exit(0)
    }
  }
}
</script>
