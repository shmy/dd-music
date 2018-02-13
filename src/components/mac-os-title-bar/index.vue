<template>
  <div class="mac-os-title-bar">
    <span class="mac-btn btn-close"
          title="关闭"
          @click="$emit('close')"></span>
    <span class="mac-btn btn-minimize"
          title="最小化"
          @click="$emit('minimize')"></span>
    <div class="drag title">
      <span>{{ title }}</span>
    </div>
    <div class="drag"
         style="height: 100%; width: 28px;">
    </div>
  </div>
</template>
<script>
export default {
  name: 'mac-os-title-bar',
  props: {
    title: {
      type: String,
      default: '点点音乐'
    }
  }
}
</script>
<style scoped>
.mac-os-title-bar {
  transition: background-color 0.3s, color 0.3s;
  height: 30px;
  display: flex;
  align-items: center;
}
.drag {
  -webkit-app-region: drag;
}
.title {
  height: 14px;
  line-height: 14px;
  text-align: center;
  font-size: 14px;
  width: 0;
  flex: 1;
}
.mac-btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #f25056;
  margin-left: 5px;
  background-repeat: no-repeat;
  background-size: 24px;
  background-position: center;
  transition: background-image 0.3s;
  cursor: pointer;
}
.btn-close {
  background-image: url("~./icons/close.svg");
}
.btn-close:hover {
  background-image: url("~./icons/close_hover.svg");
}
.btn-minimize {
  background-color: #fac536;
  background-image: url("~./icons/minimize.svg");
}
.btn-minimize:hover {
  background-image: url("~./icons/minimize_hover.svg");
}
.btn-maximize {
  background-color: #39ea49;
  background-image: url("~./icons/maximize.svg");
}
.btn-maximize:hover {
  background-image: url("~./icons/maximize_hover.svg");
}
</style>
