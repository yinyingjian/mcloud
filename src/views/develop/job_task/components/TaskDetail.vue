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
  <div v-if="task" class="page" style="width: 320px">
    <div>
      <a-row>
        <a-col class="item-key" :span="keySpan">任务Id: </a-col>
        <a-col class="item-value" :span="valueSpan">{{ task.task_id }}</a-col>
      </a-row>
      <a-row v-if="task.status">
        <a-col class="item-key" :span="keySpan">状态: </a-col>
        <a-col class="item-value" :span="valueSpan">{{ task.status.stage }}</a-col>
      </a-row>
      <a-row v-if="task.status">
        <a-col class="item-key" :span="keySpan">开始时间: </a-col>
        <a-col class="item-value" :span="valueSpan"
          ><ShowTime :timestamp="task.status.start_at"></ShowTime
        ></a-col>
      </a-row>
      <a-row>
        <a-col class="item-key" :span="keySpan">执行人: </a-col>
        <a-col class="item-value" :span="valueSpan">{{ task.run_by }}</a-col>
      </a-row>
      <a-row>
        <a-col class="item-key" :span="keySpan">执行模式: </a-col>
        <a-col class="item-value" :span="valueSpan">{{ task.run_mode }}</a-col>
      </a-row>
      <a-row>
        <a-col class="item-key" :span="keySpan">忽略失败: </a-col>
        <a-col class="item-value" :span="valueSpan">{{ task.ignore_failed }}</a-col>
      </a-row>
      <a-divider orientation="center">运行参数</a-divider>
      <div v-if="task.status">
        <div v-for="item in task.status.run_params.params" :key="item.name">
          <div class="item-key">{{ item.name }}</div>
          <a-tooltip :content="item.value">
            <div class="item-value" style="margin-left: 12px">{{ item.value }}</div>
          </a-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-key {
  font-size: 12px;
  color: var(--color-text-2);
  font-weight: 500;
}

.item-value {
  font-size: 12px;
  color: var(--color-text-1);
  width: 280px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
