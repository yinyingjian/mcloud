<script setup>
import { app } from '@/stores/localstorage'
import { LIST_JOB } from '@/api/mpaas/job'
import { onBeforeMount, reactive, ref } from 'vue'
import { Notification } from '@arco-design/web-vue'

// job搜索
const queryParams = reactive({
  page_number: 1,
  page_size: 20
})
const queryLoading = ref(false)
const data = reactive({ items: [], total: 0 })
const QueryData = async () => {
  try {
    queryLoading.value = true
    var resp = await LIST_JOB(queryParams)
    data.items = resp.items
  } catch (error) {
    Notification.error(`查询Job失败: ${error}`)
  } finally {
    queryLoading.value = false
  }
}

// 选中的Job
const selectJob = ref('')


// 加载选项
onBeforeMount(() => {
  QueryData()
})
</script>

<template>
  <div class="content">
    <a-space>
      <a-select
        v-model="selectJob"
        style="width: 280px"
        :size="app.size"
        :loading="queryLoading"
        allow-search
        allow-clear
        placeholder="如果没有 请输入Job名称进行搜索"
        @search="QueryData"
      >
        <a-option v-for="item in data.items" :key="item.id"> {{ item.name }}</a-option>
      </a-select>
      <a-button :size="app.size" type="outline">
        <template #icon>
          <icon-send />
        </template>
        运行
      </a-button>
    </a-space>
    <div class="content-left">状态</div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  height: 100%;
  padding: 0 4px;
}

.content-left {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
