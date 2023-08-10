<script setup>
import { app } from '@/stores/localstorage'
import JobTaskConsole from './components/TaskConsole.vue'
import JobTaskDetail from './components/TaskDetail.vue'
import { ref } from 'vue'

const theme = ref('Solarized_Darcula')
const collapsed = ref(true)
</script>

<template>
  <a-layout class="main">
    <a-layout>
      <a-layout-header class="header">
        <a-button :size="app.size" type="text">
          <template #icon><icon-double-left /></template>
          执行记录
        </a-button>
        <div class="header-right">
          <a-radio-group type="button" v-model="theme" default-value="GitHub">
            <a-radio value="Solarized_Darcula"><icon-moon-fill /></a-radio>
            <a-radio value="GitHub"><icon-sun-fill /></a-radio>
          </a-radio-group>
          <a-space class="collapsed">
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
          </a-space>
        </div>
      </a-layout-header>
      <a-layout-content>
        <JobTaskConsole
          taskId="xxx"
          containerName="xxx"
          height="calc(100vh - 46px - 45px)"
          :theme="theme"
        ></JobTaskConsole>
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
  left: 22px;
  background-color: rgb(255 255 255);
}

.collapsed-button-off {
  left: 15px;
  background-color: rgb(255 255 255);
}
</style>
