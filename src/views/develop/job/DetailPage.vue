<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div>
    <!-- 页头 -->
    <a-page-header title="Job详情" class="detail-header" @back="router.go(-1)"> </a-page-header>
    <!-- 详情标签页 -->
    <a-tabs default-active-key="2">
      <a-tab-pane key="1" title="基础信息"> Content of Tab Panel 1 </a-tab-pane>
      <a-tab-pane key="2" title="关联流水线"> Content of Tab Panel 2 </a-tab-pane>
      <a-tab-pane key="3" title="运行历史"> </a-tab-pane>
    </a-tabs>
  </div>
</template>
