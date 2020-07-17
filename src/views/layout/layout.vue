<template>
  <el-container class="layout">
    <el-header class="header">
      <ul class="header-ul">
        <li class="el-icon-s-fold f20" @click="collapse = !collapse"></li>
        <li>
          <img src="@/assets/img/layout-logo.png" alt="" />
        </li>
        <li class="t1">黑马面面</li>
        <li class="nouse"></li>
        <li>
          <img
            v-if="$store.state.userInfo != ''"
            class="avatar"
            :src="baseUrl + '/' + $store.state.userInfo.avatar"
            alt=""
          />
        </li>
        <li class="t2">{{ $store.state.userInfo.username }}，您好</li>
        <li>
          <el-button type="primary" @click="exit">退出</el-button>
        </li>
      </ul>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <!-- 导航
el-menu  default-active="默认选中某一项"  router:boolean  true:点击子项跳转路由（index值）
collapse：控制菜单是否折叠 true折叠 false不折叠
  el-menu-item index:就是该项的值 
 -->
        <el-menu
          :default-active="$route.path"
          :collapse="collapse"
          router
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="/layout/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/layout/userList">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/business">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/layout/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 嵌套路由
1：在相应位置加上router-view
2:配制子路由  children:[{path:component}]
 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { getUserInfo, logout } from '@/api/layout.js'
import { removeLocal } from '@/utils/local.js'
export default {
  data() {
    return {
      collapse: false,
      baseUrl: process.env.VUE_APP_URL,
      // userInfo: ''
    }
  },
  created() {
    getUserInfo().then((res) => {
      // this.userInfo = res.data
      // vues数据存储
      this.$store.state.userInfo = res.data
      window.console.log('用户信息:', res)
    })
  },
  methods: {
    exit() {
      this.$confirm('您确定要退出该用户吗？', '提示', {
        confirmButtonText: '确定退出',
        cancelButtonText: '再逛逛',
        type: 'warning',
      })
        .then(() => {
          logout().then(() => {
            this.$message.success('退出成功')
            // 删除token,跳转至登陆页
            removeLocal()
            this.$router.push('/login')
          })
        })
        .catch(() => {})
    },
  },
}
</script>
<style lang="less">
.layout {
  height: 100%;
  .header {
    .header-ul {
      display: flex;
      align-items: center;
      padding-top: 7px;
      .nouse {
        flex: 1;
      }
      .avatar {
        width: 43px;
        height: 43px;
        border-radius: 50%;
      }
      .f20 {
        font-size: 20px;
        margin-right: 15px;
      }
      .t1 {
        font-size: 22px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #49a1ff;
        letter-spacing: 1px;
        margin-left: 15px;
      }
      .t2 {
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #636363;
        letter-spacing: 0px;
        margin-right: 20px;
      }
    }
  }
  .aside {
    background-color: #00f;
  }
  .main {
    background-color: #e8e9ec;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}
</style>
