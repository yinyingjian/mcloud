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
        :default-open-keys="['ResourceList']"
        :default-selected-keys="['ResourceList_ResourceSearch']"
        show-collapse-button
        breakpoint="xl"
        auto-open
        @menu-item-click="menuItemClickHandler"
      >
        <a-sub-menu key="ResourceList">
          <template #icon><icon-layers /></template>
          <template #title>资源列表</template>
          <a-menu-item key="ResourceSearch">资源检索</a-menu-item>
          <a-menu-item key="K8sList">K8s集群</a-menu-item>
          <a-menu-item key="HostList">主机</a-menu-item>
          <a-menu-item key="GatewayList">网关</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="ResourceSync">
          <template #icon><icon-relation /></template>
          <template #title>资源同步</template>
          <a-menu-item key="ResourceTaskList">任务列表</a-menu-item>
          <a-menu-item key="ResourceSecretList">账号凭证</a-menu-item>
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
  border-right: 2px solid rgb(229, 230, 235);
}

.main {
  padding: 8px;
  width: 100%;
}
</style>
