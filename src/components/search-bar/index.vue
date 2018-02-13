<template>
  <div class="input-wrapper">
    <!-- <input type="text"
           class="input-search"
           placeholder="输入歌曲名/歌手名搜索"
           v-model="keyword"
           @input="onInput()"> -->
    <van-search class="input-search"
                placeholder="输入歌曲名/歌手名搜索"
                v-model="keyword"
                @input="onInput()" />
    <img class="type-select"
         :src="types[type].icon"
         :title="'当前从' + types[type].label + '搜索，点击以切换来源'"
         @click="toggle($event)">
    <div v-show="showPopper"
         class="popper column items-center"
         :style="{ left: popperLeft + 'px' }">
      <img class="type-select"
           v-for="(item, index) of types"
           :src="item.icon"
           :key="item.value"
           :title="'从' + item.label + '搜索'"
           :class="index === type && 'actived'"
           @click="toggleType(index)"
           style="margin: 5px 0 0 0;">
    </div>
  </div>
</template>
<script>
import { debounce } from '@/plugins/lodash.debounce'
export default {
  name: 'search-bar',
  props: ['value'],
  data () {
    return {
      keyword: this.value,
      showPopper: false,
      popperLeft: 0,
      type: 0,
      types: [
        { icon: require('./icons/qq.png'), value: 'qq', label: 'QQ音乐' },
        { icon: require('./icons/netease.jpg'), value: 'netease', label: '网易云音乐' },
        { icon: require('./icons/kuwo.png'), value: 'kuwo', label: '酷我音乐' },
        { icon: require('./icons/kugou.jpeg'), value: 'kugou', label: '酷狗音乐' }
      ]
    }
  },
  methods: {
    onInput: debounce(function () {
      this.$emit('input', this.keyword)
    }, 300),
    toggle ({ target: el }) {
      if (this.showPopper) {
        this.showPopper = false
        return
      }
      const { width, left } = el.getBoundingClientRect()
      this.popperLeft = left - width / 2 + 14
      this.showPopper = true
    },
    toggleType (index) {
      if (this.type !== index) {
        this.type = index
        this.$emit('type-change', this.types[index].value)
      }
      this.showPopper = false
    },
    setValue (val) {
      this.keyword = val
      this.$emit('input', this.keyword)
    }
  }
}
</script>
<style scoped>
.input-wrapper {
  transition: background-color 0.3s, color 0.3s;
  background-color: #f0f0ee;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
}
.input-search {
  flex: 1;
  height: 40px;
  background-color: inherit !important;
}
.type-select {
  margin-right: 15px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.3s;
  border: none;
}
.type-select:hover {
  transform: scale(1.1);
}
.type-select.actived {
  /* transform: rotate(15deg); */
  /* box-shadow: 0 0 1px 2px white; */
}
.popper {
  height: 150px;
  width: 40px;
  background-color: #666;
  position: absolute;
  bottom: -155px;
  right: 0;
  border-radius: 3px;
  z-index: 99;
}
.popper::before {
  content: " ";
  height: 0;
  width: 0;
  display: block;
  border: 6px solid #666;
  border-left-color: transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-width: 10px;
  position: absolute;
  top: -16px;
  left: 50%;
  margin-left: -6px;
}
</style>
