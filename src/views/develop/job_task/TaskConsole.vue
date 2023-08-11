<script setup>
import { app } from '@/stores/localstorage'
import LogConsole from './components/LogConsole.vue'
import DebugConsole from './components/DebugConsole.vue'
import JobTaskDetail from './components/TaskDetail.vue'
import { Notification } from '@arco-design/web-vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GET_JOB_TASK } from '@/api/mpaas/task'

const router = useRouter()
const collapsed = ref(true)
const consoleType = ref('log')

// 查询详情
const taskId = router.currentRoute.value.params.id
const task = ref({})
const GetJob = async () => {
  try {
    task.value = await GET_JOB_TASK(taskId)
  } catch (error) {
    Notification.error(`查询Task详情失败: ${error}`)
  }
}

// 加载Task对象数据
onBeforeMount(async () => {
  await GetJob()
})
</script>

<template>
  <a-layout class="main">
    <a-layout>
      <a-layout-header class="header">
        <a-button
          :size="app.size"
          type="text"
          @click="
            router.push({
              name: 'DomainJobDetail',
              params: { id: task.job.id },
              query: { tab: 'History' }
            })
          "
        >
          <template #icon><icon-double-left /></template>
          执行记录
        </a-button>
        <a-radio-group type="button" v-model="consoleType" default-value="log">
          <a-radio value="log"><icon-file /> 日志</a-radio>
          <a-radio value="debug"><icon-desktop /> 调试</a-radio>
        </a-radio-group>
        <div class="header-right">
          <a-radio-group type="button" v-model="app.xterm.theme" default-value="GitHub">
            <a-radio value="Solarized_Darcula"><icon-moon-fill /></a-radio>
            <a-radio value="GitHub"><icon-sun-fill /></a-radio>
          </a-radio-group>
          <div class="collapsed">
            <a-button
              class="collapsed-button-on"
              v-show="collapsed"
              shape="round"
              @click="collapsed = false"
            >
              <icon-left />
            </a-button>
            <a-button
              class="collapsed-button-off"
              v-show="!collapsed"
              shape="round"
              @click="collapsed = true"
            >
              <icon-right />
            </a-button>
          </div>
        </div>
      </a-layout-header>

      <a-layout-content>
        <!-- 调试控制台 -->
        <KeepAlive>
          <DebugConsole
            v-if="consoleType === 'debug'"
            :taskId="task.task_id"
            containerName=""
            height="calc(100vh - 46px - 45px)"
            :theme="app.xterm.theme"
          ></DebugConsole>
        </KeepAlive>
        <!-- 日志控制台 -->
        <KeepAlive>
          <LogConsole
            v-if="consoleType === 'log'"
            :taskId="task.task_id"
            containerName=""
            height="calc(100vh - 46px - 45px)"
            :theme="app.xterm.theme"
          ></LogConsole>
        </KeepAlive>
      </a-layout-content>
    </a-layout>

    <a-layout-sider
      class="sider"
      collapsible
      default-collapsed
      reverse-arrow
      hide-trigger
      :width="280"
      :collapsed-width="0"
      :collapsed="collapsed"
    >
      <JobTaskDetail></JobTaskDetail>
    </a-layout-sider>
  </a-layout>
</template>

<style scoped>
.header {
  height: 45px;
  display: flex;
  align-items: center;
}

.header-right {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.sider {
  display: flex;
  flex-direction: column-reverse;
  border-left: 1px solid rgb(229, 230, 235);
}

.collapsed-button-on {
  left: 15px;
  background-color: rgb(255 255 255);
}

.collapsed-button-off {
  left: 15px;
  background-color: rgb(255 255 255);
}
</style>
