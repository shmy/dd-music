<template>
  <transition name="slide">
    <div v-show="show"
         class="play-center">
      <div class="background"
           :style="{ backgroundImage: `url(${resolvePic(music.pic)})` }"></div>
      <div class="play-center-header">
        <span class="header-close"
              @click="show = false"
              title="收起">
          <i class="iconfont icon-xia"
             style="font-size: 20px"></i>
        </span>
        <p class="songname">{{ music.songname }}</p>
        <p>{{ music.singername }}</p>
      </div>
      <div class="play-center-body">
        <img class="play-pic"
             :src="resolvePic(music.pic)"
             alt=""
             :style="{ animationPlayState : playing ? 'running' : 'paused' }">
        <div class="play-lrc"></div>
      </div>
      <div class="play-center-footer">
        <play-progress :value.sync="currentTime"
                       :loading="loading"
                       :max="totalTime"
                       @input="$event => setCurrentTime($event)"
                       style="margin: 20px;" />
        <div class="play-controls">
          <div>
            <i title="播放模式"
               class="iconfont icon-liebiaoxunhuan"
               @click="$toast.success('敬请期待')"></i>
          </div>
          <div>
            <!-- <span>上</span> -->
            <i title="上一首"
               class="iconfont icon-shangyiye"
               @click="$emit('prev')"></i>
          </div>
          <div>
            <i @click="triggerPlay()"
               class="iconfont"
               :title="playing ? '暂停' : '播放'"
               :class="playing ? 'icon-play-circle-o' : 'icon-pausecircleo'"></i>
          </div>
          <div>
            <i title="下一首"
               class="iconfont icon-buoumaotubiao08"
               @click="$emit('next')"></i>
          </div>
          <div>
            <i title="收藏/取消收藏"
               class="iconfont icon-shoucang1"
               @click="$emit('favorite')"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>
<script>
import PlayProgress from '@/components/play-progress'
import PlayMixin from '@/mixin/play'
export default {
  name: 'play-center',
  mixins: [PlayMixin],
  components: {
    PlayProgress
  },
  props: {
    music: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    defaultPic: require('@/assets/music.png'),
    show: false
  })
}
</script>

<style lang="stylus" scoped>
.iconfont
  font-size: 32px
  // font-weight: bold
  color white;
  cursor pointer
.play-center {
  height: calc(100% - 30px);
  width: 100%;
  background-color: #f0f0ee;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(0);
  display: flex;
  flex-direction: column;
  z-index: 999;
}

.background {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: -20px;
  z-index: -1;
  filter: blur(15px);
  opacity: 0.5;
}

.play-center-header {
  height: 50px;
  text-align: center;
  padding: 5px 35px 0 35px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  .header-close {
    position: absolute;
    top: 5px;
    left: 8px;
  }

  .songname {
    font-size: 18px;
    padding-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.play-center-body {
  flex: 1;
  height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .play-pic {
    margin-top: 10px;
    border-radius: 50%;
    height: 220px;
    width: 220px;
    animation: rotate 30s linear infinite;
    border: 10px solid hsla(0, 0%, 100%, 0.1);
  }

  .play-lrc {
    flex: 1;
    height: 0;
    width: 100%;
  }
}

.play-center-footer {
  height: 120px;
  display: flex;
  flex-direction: column;

  .play-controls {
    // width: 100%;
    flex: 1;
    height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;

    > div {
      flex: 1;
      width: 0;
      height: 100%;
      text-align: center;
    }
  }
}

.slide-enter-active, .slide-leave-active {
  transition: 0.4s;
}

.slide-enter {
  transform: translateY(100%);
}

.slide-leave-to {
  transform: translateY(100%);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
