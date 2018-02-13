<template>
  <common-modal :show.sync="show">
    <van-nav-bar :title="title"
                 left-text="返回"
                 left-arrow
                 @click-left="$emit('update:show', false)" />
    <scroller class="scroller"
              ref="scroller">
      <slot></slot>
    </scroller>
  </common-modal>
</template>
<script>
import CommonModal from '@/components/common-modal'
import Scroller from '@/components/scrollbar'

export default {
  name: 'blank-view',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '空白页'
    }
  },
  methods: {
    scrollTo () {
      this.$refs.scroller.scrollTo(0, 0, 300)
    }
  },
  components: {
    CommonModal,
    Scroller
  }
}
</script>
<style lang="stylus" scoped>
.scroller {
  height: calc(100% - 46px) !important;
  background-color: white;
  color: black;
}
</style>
