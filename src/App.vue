<script setup>
</script>

<template>
  <!-- 顶部导航 -->
  <div>
    <a-space>
      <!-- 导航区 -->
      <div class="nav">
        <!-- logo显示区 -->
        <div>Go11微博客系统</div>
        <!-- 系统菜单 -->
        <div>系统菜单</div>
        <!-- 登录操作区 -->
        <div class="to-backend">
          <a-space>
            <!-- 模板里面使用ref对象，不需要添加value -->
            <a-button @click="JumpToBackend">后台管理</a-button>
            <a-button @click="JumpToFrontend">前台浏览</a-button>
            <a-button @click="Logout">退出</a-button>
            <a-button @click="Login">登录</a-button>
          </a-space>
        </div>
      </div>
    </a-space>
  </div>
  <!-- Layout布局页面 -->
  <!-- 这是我们的根页面,所有的页面都需要嵌入到根页面才能成形出来, 特别是Vue Route的子页面 -->
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
