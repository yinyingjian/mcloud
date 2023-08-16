<script setup>
import {} from 'vue'

// 声明属性
defineProps({
  task: { type: Object }
})

const keySpan = 6
const valueSpan = 18
</script>

<template>
  <div v-if="task" class="page" style="width: 280px">
    <div>
      <a-divider orientation="center">基本信息</a-divider>
      <a-row>
        <a-col :span="keySpan">任务Id: </a-col>
        <a-col :span="valueSpan">{{ task.task_id }}</a-col>
      </a-row>
      <a-row v-if="task.status">
        <a-col :span="keySpan">状态: </a-col>
        <a-col :span="valueSpan">{{ task.status.stage }}</a-col>
      </a-row>
      <a-row v-if="task.status">
        <a-col :span="keySpan">开始时间: </a-col>
        <a-col :span="valueSpan"><ShowTime :timestamp="task.status.start_at"></ShowTime></a-col>
      </a-row>
      <a-row>
        <a-col :span="keySpan">执行人: </a-col>
        <a-col :span="valueSpan">{{ task.run_by }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="keySpan">执行模式: </a-col>
        <a-col :span="valueSpan">{{ task.run_mode }}</a-col>
      </a-row>
      <a-row>
        <a-col :span="keySpan">忽略失败: </a-col>
        <a-col :span="valueSpan">{{ task.ignore_failed }}</a-col>
      </a-row>
      <a-divider orientation="center">运行参数</a-divider>
    </div>
  </div>
</template>

<style scoped>
.detail-key {
  width: 80px;
}

.detail-value {
  width: 290px;
}
</style>
