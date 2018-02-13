<template>
  <div class="header-tab-wrapper">
    <div class="header-tab-item"
         :class="route === item.route && 'actived'"
         v-for="item of menu"
         :key="item.id"
         :title="item.label"
         @click="$router.push(item.route)">
      <span class="link">{{ item.label }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'header-tab',
  props: {
    menu: {
      type: Array,
      default: () => ([
        { id: 1, label: '推荐', route: '/' },
        // { id: 2, label: '歌手', route: '/singer' },
        // { id: 3, label: '排行', route: '/rank' },
        { id: 4, label: '搜索', route: '/search' },
        { id: 5, label: '我的', route: '/me' }
      ])
    },
    route: {
      type: String,
      default: '/'
    }
  }
}
</script>
<style lang="stylus" scoped>
.header-tab-wrapper {
  transition: background-color 0.3s, color 0.3s;
  height: 45px;
  line-height: 45px;
  background-color: #f0f0ee;
  display: flex;

  .link {
    font-size: 14px;
    position: relative;
    // transition: color 0.3s;

    &::after {
      content: '';
      position: absolute;
      height: 2px;
      width: 0;
      left: 0;
      bottom: -4px;
      transition: width 0.3s;
      background-color: currentColor;
    }
  }
}

.header-tab-item {
  text-align: center;
  // color: #666;
  cursor: pointer;
  flex: 1;
  width: 0;

  &.actived {
    color: red;

    .link {
      &::after {
        width: 100%;
      }
    }
  }
}
</style>
