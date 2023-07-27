<script setup>
import { app } from '@/stores/localstorage'
import { LIST_SUB_USER } from '@/api/mcenter/user'
import { Message } from '@arco-design/web-vue'
import { onMounted, reactive, ref } from 'vue'

const breadcrumb_routes = [
  { name: 'PermissionManage', label: '权限管理' },
  { name: 'UserList', label: '用户列表' }
]

const queryLoading = ref(false)
const data = reactive({ items: [], total: 0 })
onMounted(async () => {
  try {
    queryLoading.value = true
    var resp = await LIST_SUB_USER()
    data.items = resp.items
    data.total = resp.total
  } catch (error) {
    Message.error(`查询用户失败: ${error}`)
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
      <a-button type="primary" :size="app.size"> 创建用户 </a-button>
    </div>
    <div>
      <a-table :data="data.items" style="margin-top: 30px" :loading="queryLoading">
        <template #columns>
          <a-table-column title="用户名" data-index="username"></a-table-column>
          <a-table-column title="类型" data-index="type"></a-table-column>
          <a-table-column title="创建时间" data-index="create_at"></a-table-column>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped></style>
