<script setup>
import { app } from '@/stores/localstorage'
import { useRouter } from 'vue-router'
import { LIST_NAMESPACE } from '@/api/mcenter/namespace'
import { CHANGE_NAMESPACE } from '@/api/mcenter/token'
import { onBeforeMount, reactive, ref } from 'vue'

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

// 查询空间列表
const currentNamespace = ref(app.value.token.namespace)
const namespaces = reactive({items: [], total: 0})
const ListNamespace = async () => {
  var resp  = await LIST_NAMESPACE()
  namespaces.items = resp.items
  namespaces.total = resp.total
}

// 切换空间
const ChangeNamespace = async (namespace) => {
  var resp = await CHANGE_NAMESPACE({namespace})
  app.value.token = resp
}

onBeforeMount(() => {
  ListNamespace()
})
</script>

<template>
  <!-- 顶部导航 -->
  <div v-if="app.isLogin" class="nav">
    <!-- logo显示区 -->
    <div class="logo">mcloud</div>
    <!-- 空间选择区 -->
    <div class="namespace-choice" v-if="app.isLogin">
      <a-select placeholder="请选择工作空间" :bordered="false" v-model="currentNamespace" @change="ChangeNamespace">
        <a-option v-for="item in namespaces.items" :key="item.id" :label="item.description" :value="item.name"></a-option>
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
      <a-button
        v-if="app.token.user_type === 'SUPPER' || app.token.user_type === 'PRIMARY'"
        type="text"
        @click="JumpToAdmin"
      >
        管理后台
      </a-button>
      <div class="user-info">
        <a-button v-if="app.isLogin" type="text" @click="Logout">退出</a-button>
        <a-button v-else type="text" @click="Login">登录</a-button>
      </div>
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
  width: 50%;
  height: 100%;
}

.nav-right {
  margin-left: auto;
  height: 100%;
  display: flex;
  align-items: center;
}

.nav :deep(.arco-menu) {
  height: 100%;
}

.nav :deep(.arco-menu-inner) {
  padding: -7px;
}

.nav :deep(.arco-menu-selected-label) {
  bottom: -7px;
}

.namespace-choice {
  display: flex;
  align-items: center;
  width: 180px;
  height: 100%;
  border-right: 1px solid rgb(229, 230, 235);
}

.namespace-choice :deep(.arco-select-view-single) {
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  height: 100%;
  border-right: 1px solid rgb(229, 230, 235);
  padding-right: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  height: 100%;
  border-left: 1px solid rgb(229, 230, 235);
}

.nav-right :deep(.arco-btn-size-medium) {
  height: 100%;
}
</style>
