<script setup>
import { useRouter } from 'vue-router'
import { app } from '@/stores/localstorage'

const router = useRouter()
router.push({ name: app.value.menu.admin })
const menuItemClickHandler = (routeName) => {
  app.value.menu.admin = routeName
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
        :default-open-keys="['PermissionManage']"
        :default-selected-keys="['UserList']"
        :selected-keys="[app.menu.admin]"
        show-collapse-button
        auto-open
        breakpoint="xl"
        @menu-item-click="menuItemClickHandler"
      >
        <a-sub-menu key="PermissionManage">
          <template #icon><icon-lock /></template>
          <template #title>权限管理</template>
          <a-menu-item key="DomainDetail">登录管理</a-menu-item>
          <a-menu-item key="UserList">用户列表</a-menu-item>
          <a-menu-item key="NamespaceList">空间列表</a-menu-item>
          <a-menu-item key="RoleList">角色列表</a-menu-item>
          <a-menu-item key="LabelList">标签列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="AuditManage">
          <template #icon><icon-eye /></template>
          <template #title>审计管理</template>
          <a-menu-item key="AuditLoginLog">登录日志</a-menu-item>
          <a-menu-item key="AuditOperateLog">操作日志</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <!-- 内容操作区 -->
    <div class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>
