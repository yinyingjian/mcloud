<script setup>
import RunJob from './components/RunJob.vue'
import JobTaskConsole from './components/JobTaskConsole.vue'
import JobTaskDetail from './components/JobTaskDetail.vue'
import { GitHub } from '@/tools/term'
</script>

<template>
  <a-layout class="main">
    <a-layout>
      <a-layout-header class="header">
        <RunJob></RunJob>
      </a-layout-header>
      <a-layout-content>
        <JobTaskConsole height="calc(100vh - 46px - 45px)" :theme="GitHub"></JobTaskConsole>
      </a-layout-content>
    </a-layout>
    <a-layout-sider>
      <JobTaskDetail></JobTaskDetail>
    </a-layout-sider>
  </a-layout>
</template>

<style scoped>
.header {
  height: 45px;
}
</style>
