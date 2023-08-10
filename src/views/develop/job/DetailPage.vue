<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import JobTask from './components/JobTask.vue'

const router = useRouter()
const tab = ref(router.currentRoute.value.query.tab)
if (!tab.value) {
  tab.value = 'BaseInfo'
}
const ChangeTab = (v) => {
  tab.value = v
  router.replace({ query: { tab: v } })
}
</script>

<template>
  <div>
    <!-- 页头 -->
    <a-page-header title="Job详情" class="detail-header" @back="router.go(-1)"> </a-page-header>
    <!-- 详情标签页 -->
    <a-tabs :active-key="tab" @change="ChangeTab">
      <a-tab-pane key="BaseInfo" title="基础信息"> </a-tab-pane>
      <a-tab-pane key="Pipeline" title="关联流水线"> </a-tab-pane>
      <a-tab-pane key="History" title="执行记录">
        <JobTask></JobTask>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
