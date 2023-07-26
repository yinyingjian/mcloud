<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const menuItemClickHandler = (routeName) => {
  router.push({ name: routeName })
}
</script>

<template>
  <div class="backend">
    <!-- 菜单导航区 -->
    <div class="menu">
      <a-menu
        :style="{ width: '200px', height: '100%' }"
        :default-open-keys="['AdminPage']"
        :default-selected-keys="['AdminPage_UserList']"
        show-collapse-button
        auto-open
        breakpoint="xl"
        @menu-item-click="menuItemClickHandler"
      >
        <a-sub-menu key="AdminPage">
          <template #icon><icon-lock /></template>
          <template #title>权限管理</template>
          <a-menu-item key="UserList">用户列表</a-menu-item>
          <a-menu-item key="NamespaceList">空间列表</a-menu-item>
          <a-menu-item key="RoleList">角色列表</a-menu-item>
          <a-menu-item key="LabelList">标签列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="AdminPage">
          <template #icon><icon-common /></template>
          <template #title>研发工具</template>
          <a-menu-item key="UserList">Job管理</a-menu-item>
          <a-menu-item key="NamespaceList">Pipeline模版</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <!-- 内容操作区 -->
    <div class="main">
      <!-- 子路由的视图, 前提是TestView的视图和TestView2的视图的有路由是路由是嵌套的 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.backend {
  display: flex;
  height: calc(100vh - 47px);
}

.menu {
  border-right: 1px solid rgb(229, 230, 235);
}

.main {
  padding: 8px;
  width: 100%;
}
</style>
