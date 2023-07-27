<script setup>
import { app } from '@/stores/localstorage'
import { LIST_ROLE } from '@/api/mcenter/role'
import { Message } from '@arco-design/web-vue'
import { onMounted, reactive, ref } from 'vue'

const breadcrumb_routes = [
  { name: 'PermissionManage', label: '权限管理' },
  { name: 'RoleList', label: '角色列表' }
]

const queryLoading = ref(false)
const data = reactive({ items: [], total: 0 })
onMounted(async () => {
  try {
    queryLoading.value = true
    var resp = await LIST_ROLE()
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
      <a-button type="primary" :size="app.size"> 创建角色 </a-button>
    </div>
    <div>
      <a-table :data="data.items" style="margin-top: 30px" :loading="queryLoading">
        <template #columns>
          <a-table-column title="名称" data-index="name"></a-table-column>
          <a-table-column title="描述" data-index="description"></a-table-column>
          <a-table-column title="创建时间" data-index="create_at"></a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped></style>
