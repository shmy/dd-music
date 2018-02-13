<template>
  <div class="music-tool-bar-wrapper column"
       :style="styleObj">
    <play-progress v-show="music.url"
                   :loading="loading"
                   :value.sync="currentTime"
                   :max="totalTime"
                   @input="setCurrentTime($event)"
                   class="progress-range" />
    <!-- <div style="height: 15px"></div> -->
    <div class="row items-center">
      <div class="tap-area col-w row items-center"
           @click="$emit('detail-click')"
           title="进入歌曲写真">

        <div class="music-bar-pic row justify-center items-center"
             :style="{ backgroundImage: `url(${resolvePic(music.pic)})` }">
          <i class="main-controll-icon iconfont"
             :class="playing ? 'icon-pausecircleo playing' : 'icon-play-circle-o'"
             :title="playing ? '暂停播放' : '开始播放'"
             @click.stop="triggerPlay()"></i>
        </div>
        <div class="music-bar-desc col-w">
          <div class="songname">{{ music.songname || '点点音乐' }}</div>
          <div class="singername">{{ music.singername || '想听就听' }}</div>
        </div>
      </div>
      <div style="width: 90px; height:60px; padding-bottom: 5px"
           class="column">
        <div class="progress-time">
          <span>{{ currentTime | timeProcess }}</span>/
          <span>{{ totalTime | timeProcess }}</span>
        </div>
        <div class="col-h row justify-around items-end">
          <!-- <i title="下一首"
             class="controll-icon iconfont icon-buoumaotubiao08"></i> -->
          <!-- <i title="切换桌面歌词"
             @click="$emit('trigger-window')"
             :class="showLrcWindow && 'actived'"
             class="controll-icon iconfont icon-guanjianci"></i> -->
          <i title="免费下载这首歌"
             class="controll-icon iconfont icon-xiazai"
             @click="$emit('download')"></i>
          <i title="播放列表"
             @click="$emit('open-playlist')"
             class="controll-icon iconfont icon-erji-caidanguanli"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PlayProgress from '@/components/play-progress'
import PlayMixin from '@/mixin/play'
export default {
  name: 'music-tool-bar',
  mixins: [PlayMixin],
  components: {
    PlayProgress
  },
  computed: {
    styleObj () {
      return {
        backgroundColor: this.music.primary,
        color: this.music.font
      }
    }
  },
  props: {
    music: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
.main-controll-icon {
  font-size: 30px;
  opacity: 0.9;
  font-weight: bold;
  transition: transform 0.3s;
}
.playing {
  transform: scale(0.5) translate3d(35px, 35px, 0);
}
.controll-icon {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}
.controll-icon:hover {
  color: #0af;
}
.controll-icon.actived {
  color: #0af;
}
.music-tool-bar-wrapper {
  height: 67px;
  transition: background-color 0.3s, color 0.3s;
  position: relative;
}

.music-bar-pic {
  width: 67px;
  height: 67px;
  background-size: cover;
  /* background-position: 0 5px; */
  background-repeat: no-repeat;
  position: relative;
}
.music-bar-desc {
  padding: 0 10px;
}
.music-bar-desc > .songname,
.music-bar-desc > .singername {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.music-bar-desc > .songname {
  font-size: 18px;
  margin-bottom: 5px
}
.music-bar-desc > .singername {
  font-size: 14px;
  /* color: #666; */
}
.tap-area {
  cursor: pointer;
}
.progress-time {
  font-size: 14px;
  margin-top: 15px;
}
.progress-range {
  position: absolute;
  margin: 0;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
}

.row, .column {
  display: flex;
  flex-direction: row;
}
.column {
  flex-direction: column;
}
.col-w, .col-h {
  flex: 1;
}
.col-w {
  width: 0;
}
.col-h {
  height: 0;
}
.justify-center {
  justify-content: center
}
.items-center {
  align-items: center;
}

</style>
