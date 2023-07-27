<script setup>
import { app } from '@/stores/localstorage'
import { LIST_SERVICE } from '@/api/mcenter/service'
import { Message } from '@arco-design/web-vue'
import { onMounted, reactive, ref } from 'vue'

const breadcrumb_routes = [
  { name: 'ServiceList', label: '服务管理' },
  { name: 'ServiceList', label: '服务列表' }
]

const queryLoading = ref(false)
const data = reactive({ items: [], total: 0 })
onMounted(async () => {
  try {
    queryLoading.value = true
    var resp = await LIST_SERVICE()
    data.items = resp.items
    data.total = resp.total
  } catch (error) {
    Message.error(`查询服务失败: ${error}`)
  } finally {
    queryLoading.value = false
  }
})
</script>

<template>
  <div>
    <div>
      <a-breadcrumb :routes="breadcrumb_routes" />
    </div>
    <div>
      <a-button type="primary" :size="app.size"> 创建服务 </a-button>
    </div>
    <div>
      <a-table :data="data.items" style="margin-top: 30px" :loading="queryLoading">
        <template #columns>
          <a-table-column title="名称" data-index="name"></a-table-column>
          <a-table-column title="类型" data-index="type"></a-table-column>
          <a-table-column title="仓库" data-index="code_repository.ssh_url"></a-table-column>
          <a-table-column title="创建时间" data-index="create_at"></a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped></style>
