<script setup>
import { app } from '@/stores/localstorage'
</script>

<template>
  <div>
    <a-tabs :size="app.size">
      <a-tab-pane key="PASSWORD" title="本地用户"> Content of Tab Panel 1 </a-tab-pane>
      <a-tab-pane key="LDAP" title="LDAP"> Content of Tab Panel 2 </a-tab-pane>
      <a-tab-pane key="FEISHU" title="飞书登录"> Content of Tab Panel 3 </a-tab-pane>
    </a-tabs>
  </div>
</template>
