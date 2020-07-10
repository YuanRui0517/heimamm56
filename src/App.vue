<template>
  <div class="app">
    <!-- 路由出口 -->
    <div class="test">123</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
/* less使用 style上面加一个lang=“less” */
.app {
  .test {
    width: 100px;
    height: 100px;
    background-color: #f00;
  }
}
</style>
