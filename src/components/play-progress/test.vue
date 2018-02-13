<template>
  <div class="play-progress-wrap">
    <input type="range"
           style="display: none"
           :max="max"
           :value="value">
    <div class="play-progress-track">
      <div class="play-progress-thumb">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'play-progress',
  props: {
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 23
    }
  },
  methods: {
    onInput ({ target }) {
      // this.$emit('update:value', +target.value)
      this.$emit('input', +target.value)
    }
  }
}
</script>
<style lang="stylus" scoped>
.play-progress-wrap {
  border-radius: 1px;
  height: 5px;
  background-repeat: no-repeat;
  background-color: #ddd;
  cursor: pointer;

  .play-progress-track {
    height: 100%;
    width: 20%;
    background-color: #0af;
    position: relative;

    .play-progress-thumb {
      position: absolute;
      height: 16px;
      width: 16px;
      background-color: #0af;
      border-radius: 50%;
      border: solid 3px red;
      right: -22px;
      top: -11px;
    }
  }
}
</style>
