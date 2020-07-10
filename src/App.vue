<template>
  <div class="app">
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
/* less使用 style上面加一个lang=“less” */
* {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}
body,
html,
.app {
  height: 100%;
  width: 100%;
}
</style>
