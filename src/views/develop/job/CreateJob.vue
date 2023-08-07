<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GET_JOB, CREATE_JOB } from '@/api/mpaas/job'
import { Notification } from '@arco-design/web-vue'

const router = useRouter()
const form = ref({
  name: '',
  display_name: '',
  description: '',
  runner_type: 'K8S_JOB',
  runner_spec: ''
})

// 提交处理
const submitLoading = ref(false)
const handleSubmit = async (data) => {
  if (!data.errors) {
    try {
      submitLoading.value = true
      let resp = await CREATE_JOB(data.values)
      console.log(resp)
      router.push({ name: 'NamespaceList' })
    } catch (error) {
      Notification.error(`保存失败: ${error}`)
    } finally {
      submitLoading.value = false
    }
  }
}

// 判断更新模式
let pageHeader = '创建Job'
const id = router.currentRoute.value.query.id
const isCreate = id === undefined
const GetNamespace = async () => {
  if (!isCreate) {
    pageHeader = '编辑Job'
    try {
      form.value = await GET_JOB(id)
    } catch (error) {
      Notification.error(`查询Job失败: ${error}`)
    }
  }
}
onBeforeMount(async () => {
  GetNamespace()
})
</script>

<template>
  <div class="page">
    <!-- 页头 -->
    <a-page-header :title="pageHeader" @back="router.go(-1)"> </a-page-header>

    <a-card>
      <a-form :model="form" @submit="handleSubmit" auto-label-width>
        <a-form-item
          field="name"
          label="名称"
          :disabled="!isCreate"
          required
          help="创建后不允许修改"
        >
          <a-input v-model="form.name" placeholder="请输入Job名称" />
        </a-form-item>
        <a-form-item field="display_name" label="展示名称" required>
          <a-input v-model="form.display_name" placeholder="请输入Job展示名称" />
        </a-form-item>
        <a-form-item field="description" label="描述" required>
          <a-input v-model="form.description" placeholder="请输入空间名称" />
        </a-form-item>
        <a-form-item field="runner_spec" label="定义" required>
          <CodeEditor v-model="form.runner_spec" language="yaml"></CodeEditor>
        </a-form-item>
        <div class="form-submit">
          <a-space>
            <a-button @click="router.push({ name: 'NamespaceList' })">取消</a-button>
            <a-button type="primary" html-type="submit" :loading="submitLoading">保存</a-button>
          </a-space>
        </div>
      </a-form>
    </a-card>
  </div>
</template>
