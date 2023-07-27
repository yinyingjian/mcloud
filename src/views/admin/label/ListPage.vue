<script setup>
import { app } from '@/stores/localstorage'
import { LIST_LABEL } from '@/api/mcenter/label'
import { Message } from '@arco-design/web-vue'
import { onMounted, reactive, ref } from 'vue'

const breadcrumb_routes = [
  { name: 'PermissionManage', label: '权限管理' },
  { name: 'LabelList', label: '标签列表' }
]

const queryLoading = ref(false)
const data = reactive({ items: [], total: 0 })
onMounted(async () => {
  try {
    queryLoading.value = true
    var resp = await LIST_LABEL()
    data.items = resp.items
    data.total = resp.total
  } catch (error) {
    Message.error(`查询角色失败: ${error}`)
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
      <a-button type="primary" :size="app.size"> 创建标签 </a-button>
    </div>
    <div>
      <a-table :data="data.items" style="margin-top: 30px" :loading="queryLoading">
        <template #columns>
          <a-table-column title="名称" data-index="key"></a-table-column>
          <a-table-column title="描述" data-index="value_desc"></a-table-column>
          <a-table-column title="创建时间" data-index="create_at"></a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped></style>
