<template>
  <div class="login">
    <div class="left">
      <div class="header">
        <img src="@/img/title_logo.png" alt />
        <span class="headerName">黑马面面</span>
        <span class="headerLine">|</span>
        <span class="headerName2">用户登陆</span>
      </div>
      <div id="app">
        <el-input
          class="inputValue"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          v-model="input1"
        >
        </el-input>
        <el-input
          class="inputValue"
          show-password
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          v-model="input2"
        >
        </el-input>
        <el-input
          class="inputValua"
          placeholder="请输入验证码"
          prefix-icon="el-icon-key"
          v-model="input3"
        >
        </el-input>
      </div>
    </div>
    <div class="right">
      <img src="@/img/login_banner_ele.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
    }
  },
}
</script>
<style lang="less">
.login {
  /* 弹性盒子布局 */
  display: flex;
  /* 水平布局 */
  justify-content: space-around;
  /* 垂直居中 */
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    padding: 42px;
    background-color: #f5f5f5;
    .header {
      display: flex;
      align-items: center;
      .headerName {
        font-size: 24px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
      .headerName2 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin: 0 15px;
      }
    }
    #app {
      margin-top: 28px;
      .inputValue {
        width: 394px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px;
        margin-bottom: 25px;
      }
      .inputValua {
        width: 284px;
        height: 40px;
        background: #ffffff;
        border-radius: 4px;
      }
    }
  }
}
</style>
