<script setup>
import RunJob from './components/RunJob.vue'
import JobConsole from './components/JobConsole.vue'
import JobParams from './components/JobParams.vue'

</script>

<template>
  <a-layout class="main">
    <a-layout>
      <a-layout-header>
        <RunJob></RunJob>
      </a-layout-header>
      <a-layout-content theme="dark">
        <JobConsole></JobConsole>
      </a-layout-content>
    </a-layout>
    <a-layout-sider>
        <JobParams></JobParams>
    </a-layout-sider>
  </a-layout>
</template>
