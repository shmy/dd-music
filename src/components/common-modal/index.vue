<template>
  <transition name="slide">
    <div class="common-modal"
         v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'common-modal',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="stylus" scoped>
.common-modal {
  height: calc(100% - 30px);
  width: 100%;
  background-color: #eee;
  position: fixed;
  top: 30px;
  left: 0;
  z-index: 99;
}

.slide-enter-active, .slide-leave-active {
  transition: 0.4s;
}

.slide-enter {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}
</style>
