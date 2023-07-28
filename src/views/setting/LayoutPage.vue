<script setup>
import { useRouter } from 'vue-router'
import { app } from '@/stores/localstorage'

// 设置默认Menu
if (app.value.menu === '') {
  app.value.menu = 'NamespacePolicyList'
}

const router = useRouter()
const menuItemClickHandler = (routeName) => {
  app.value.menu = routeName
  router.push({ name: routeName })
}
</script>

<template>
  <TopMenu />
  <div class="sidebar">
    <!-- 菜单导航区 -->
    <div class="sidebar-menu">
      <a-menu
        :style="{ width: '200px', height: '100%' }"
        :default-open-keys="['ResourceList']"
        :default-selected-keys="['NamespacePolicyList']"
        :selected-keys="[app.menu]"
        show-collapse-button
        breakpoint="xl"
        auto-open
        auto-open-selected
        @menu-item-click="menuItemClickHandler"
      >
        <a-sub-menu key="NamespacePermission">
          <template #icon><icon-lock /></template>
          <template #title>权限管理</template>
          <a-menu-item key="NamespacePolicyList">访问策略</a-menu-item>
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
