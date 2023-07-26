<script setup>
import { app } from '@/stores/localstorage'
import { useRouter } from 'vue-router'

const router = useRouter()
const Logout = () => {
  app.value.isLogin = false
  router.push({ name: 'LoginPage' })
}
const Login = () => {
  router.push({ name: 'LoginPage' })
}
const JumpToAdmin = () => {
  router.push({ name: 'AdminPage' })
}
const menuItemClickHandler = (routeName) => {
  router.push({ name: routeName })
}
</script>

<template>
  <!-- 顶部导航 -->
  <div class="nav">
    <!-- logo显示区 -->
    <div>mcloud</div>
    <!-- 空间选择区 -->
    <div class="namespace-choice" v-if="app.isLogin">
      <a-select placeholder="请选择工作空间" :bordered="false">
        <a-option>Default</a-option>
      </a-select>
    </div>

    <!-- 系统菜单 -->
    <div v-if="app.isLogin" class="nav-menu">
      <a-menu
        mode="horizontal"
        :default-selected-keys="['HomePage']"
        @menu-item-click="menuItemClickHandler"
      >
        <a-menu-item key="HomePage">仪表盘</a-menu-item>
        <a-menu-item key="ResourcePage">资源管理</a-menu-item>
        <a-menu-item key="DevelopPage">研发交付</a-menu-item>
      </a-menu>
    </div>
    <!-- 登录操作区 -->
    <div class="nav-right">
      <a-button type="text" @click="JumpToAdmin">管理后台</a-button>
      <a-button v-if="app.isLogin" type="text" @click="Logout">退出</a-button>
      <a-button v-else type="text" @click="Login">登录</a-button>
    </div>
  </div>
  <!-- Layout布局页面 -->
  <!-- 这是我们的根页面,所有的页面都需要嵌入到根页面才能成形出来, 特别是Vue Route的子页面 -->
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.nav {
  padding: 0 8px;
  height: 45px;
  width: 100vw;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(229, 230, 235);
  background-color: #fff;
}

.nav-menu {
  width: 60%;
  height: 100%;
}

.nav-right {
  margin-left: auto;
}

.nav :deep() .arco-menu {
  height: 100%;
}

.nav :deep() .arco-menu-inner {
  padding: -7px;
}

.nav :deep() .arco-menu-selected-label {
  bottom: -7px;
}

.namespace-choice {
  width: 180px;
}
</style>
