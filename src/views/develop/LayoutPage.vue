<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const menuItemClickHandler = (routeName) => {
  router.push({ name: routeName })
}
</script>

<template>
  <div class="top-bar">
    <!-- 菜单导航区 -->
    <div class="top-menu">
      <a-menu
        :style="{ width: '200px', height: '100%' }"
        :default-open-keys="['DevelopPage']"
        :default-selected-keys="['DevelopPage_ServiceList']"
        show-collapse-button
        auto-open
        breakpoint="xl"
        @menu-item-click="menuItemClickHandler"
      >
        <a-sub-menu key="DevelopPage">
          <template #icon><icon-apps /></template>
          <template #title>服务管理</template>
          <a-menu-item key="ServiceList">服务列表</a-menu-item>
          <a-menu-item key="DeployList">部署列表</a-menu-item>
          <a-menu-item key="TriggerList">触发配置</a-menu-item>
          <a-menu-item key="ApprovalList">上线申请</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="DevToolManage">
          <template #icon><icon-common /></template>
          <template #title>研发工具</template>
          <a-menu-item key="DomainPipelineList">Pipeline模版</a-menu-item>
          <a-menu-item key="DomainJobList">Job管理</a-menu-item>
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
