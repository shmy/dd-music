<script>
import Scrollbar from './scrollbar'
import { debounce } from '@/plugins/lodash.debounce'

export default {
  name: 'scroller',
  data: () => ({
    scroller: null,
    page: 0,
    noMore: false,
    fail: false
  }),
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    loadingText: {
      type: String,
      default: '正在加载中...'
    },
    noMoreText: {
      type: String,
      default: '- 没有更多数据了 -'
    },
    backTopText: {
      type: String,
      default: '返回顶部'
    },
    retryText: {
      type: String,
      default: '加载失败，点击重试'
    },
    load: {
      type: Boolean,
      default: false
    }
  },
  render (createElement) {
    const img = require('./loading.svg')
    const loading = createElement('p',
      {
        staticClass: 'scrollbar-loading'
      },
      [
        createElement('img', {
          attrs: {
            src: img
          }
        }),
        this.loadingText
      ]
    )
    const noMore = createElement('p',
      {
        staticClass: 'scrollbar-loading'
      },
      [
        this.noMoreText
      ]
    )
    const loadFail = createElement('p',
      {
        staticClass: 'scrollbar-loading loading-fail',
        on: {
          click: this.clickRetryHandler
        }
      },
      [
        this.retryText
      ]
    )
    const a = () => {
      if (this.noMore) return noMore
      if (this.fail) return loadFail
      if (this.load) return loading
      return undefined
    }
    return createElement(
      'div',
      {
        staticClass: 'scrollbar',
        ref: 'scroller'
      },
      [
        createElement(
          this.tag,
          null,
          [
            this.$slots.default,
            a(),
            this.$slots.extend
          ]
        )
      ]
    )
  },
  mounted () {
    this.$nextTick(() => {
      this.scroller = Scrollbar(this.$refs.scroller)
      this.bind()
    })
  },
  methods: {
    bind () {
      const el = document.createElement('div')
      el.className = 'scrollbar-backtop'
      el.title = this.backTopText
      el.onclick = () => {
        this.scroller.scrollTo(0, 0, 300)
      }
      this.scroller.containerEl.appendChild(el)
      const fn = debounce(({ limit, offset }) => {
        if (!this.noMore && !this.fail) {
          if (offset.y >= limit.y - 30) {
            this.emitLoad()
          }
        }
        if (offset.y >= 400) {
          el.classList.add('actived')
        } else {
          el.classList.remove('actived')
        }
      }, 300)
      this.scroller.addListener(fn)
    },
    scrollTo (...args) {
      this.scroller.scrollTo(...args)
    },
    emitLoad () {
      this.$emit('load', {
        endBySize: this.endBySize.bind(this),
        endError: this.endError.bind(this)
      })
    },
    reset () {
      this.page = 1
      this.noMore = false
      this.fail = false
    },
    clickRetryHandler () {
      this.fail = false
      this.emitLoad()
    },
    endBySize (total, perPage = 20) {
      this.page++
      if ((this.page - 1) * perPage >= total) {
        this.noMore = true
      }
    },
    endError () {
      this.fail = true
    }
  }
}
</script>
<style lang="stylus">
.scrollbar-backtop.actived {
  transform translateX(0)
  cursor pointer
}
.scrollbar-backtop {
  position absolute;
  right 10px;
  bottom 8px;
  height 35px;
  width 35px;
  z-index 1;
  transition transform .3s;
  border-radius 50%;
  background-image url('~./back-top.png');
  background-repeat no-repeat;
  background-size cover;
  transform translateX(calc(40px + 10px));
}
</style>
<style lang="stylus" scoped>

.scrollbar {
  height: 100%;
  width: 100%;
  .loading-fail {
    cursor pointer
    &:hover {
      opacity .7
    }
  }
  .scrollbar-loading {
    height: 60px;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;

    img {
      height: 20px;
      width: 20px;
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
