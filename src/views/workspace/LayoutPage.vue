<script setup></script>

<template>
  <div>
    <TopMenu />
    <!-- 内容操作区 -->
    <div class="main">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>
