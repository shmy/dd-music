<template>
  <input type="range"
         class="play-progress"
         :class="loading && 'loading'"
         :max="max"
         :value="value"
         :style="{ backgroundSize: `${progress}% 100%` }"
         @input="onInput($event)">
</template>
<script>
export default {
  name: 'play-progress',
  computed: {
    progress () {
      if (!this.value) return 0
      return +(this.value / this.max).toFixed(2) * 100
    }
  },
  props: {
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 23
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onInput ({ target }) {
      this.$emit('update:value', +target.value)
      this.$emit('input', +target.value)
    }
  }
}
</script>

<style lang="stylus" scoped>
.play-progress {
  -webkit-appearance: none;
  outline: none;
  border-radius: 1px;
  height: 5px;
  background-image: linear-gradient(to right, #0af, #0af);
  background-repeat: no-repeat;
  background-color: #ddd;
  cursor pointer
  // background-size: 75% 100%;

  &::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 50%;
    background-size 100%
    background-image: linear-gradient(to right, #0af, #0af);
    background-repeat no-repeat
    background-position 0 0
    border: solid 3px #eee
  }
}
.loading {
  &::-webkit-slider-thumb {
    background-image url('./Rolling-0.9s-20px.svg')
  }
}
</style>
