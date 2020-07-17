<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created () {}
}
</script>

<style lang="less">
/* less使用  style上面加一个lang="less" */
* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}
body,
html,
.app {
  width: 100%;
  height: 100%;
}
</style>
