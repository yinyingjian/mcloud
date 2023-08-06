<script setup>
import { app } from '@/stores/localstorage'
import { useRouter } from 'vue-router'
import { LIST_GITLAB_PROJECT } from '@/api/mcenter/service'
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'

const router = useRouter()

const queryParams = reactive({ address: 'https://gitlab.com', token: '' })
const projects = ref([])
const nextLoading = ref(false)
const gitlabForm = ref(null)
const listProject = async () => {
  try {
    nextLoading.value = true
    projects.value = await LIST_GITLAB_PROJECT(queryParams)
  } catch (error) {
    Message.error(`查询项目失败: ${error}`)
  } finally {
    nextLoading.value = false
  }
}

// 步骤条导航
const current = ref(1)
const setCurrent = (v) => {
  current.value = v
}
const onPrev = () => {
  current.value = Math.max(1, current.value - 1)
}
const onNext = async () => {
  switch (current.value) {
    case 1:
      var valiatedErr = await gitlabForm.value.validate()
      if (valiatedErr) {
        return
      }
      await listProject()
      break
    default:
      break
  }

  current.value = Math.max(2, current.value + 1)
}
</script>

<template>
  <div class="page">
    <!-- 页头 -->
    <a-page-header title="Gitlab服务导入" @back="router.go(-1)"> </a-page-header>

    <!-- 步骤条导航 -->
    <a-card>
      <a-steps changeable :current="current" @change="setCurrent">
        <a-step description="提供Gitlab服务查询凭证">Gitlab凭证</a-step>
        <a-step description="选择项目导入">项目导入</a-step>
      </a-steps>

      <!-- 步骤条内容显示 -->
      <div class="step-content">
        <div v-show="current === 1">
          <a-form ref="gitlabForm" :model="queryParams" auto-label-width>
            <a-form-item
              field="address"
              label="服务地址"
              required
              help="Gitlab服务地址, 例如: https://gitlab.com"
            >
              <a-input v-model="queryParams.address" />
            </a-form-item>
            <a-form-item field="token" label="Token" required>
              <template #help>
                <span
                  >请参考<a
                    class="link"
                    href="https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#create-a-personal-access-token"
                    target="_blank"
                    >官方文档</a
                  >创建Private Token</span
                >
              </template>

              <a-input v-model="queryParams.token" placeholder="请输入Gitlab Private Token" />
            </a-form-item>
          </a-form>
        </div>
        <div v-show="current === 2">
          <a-table :data="projects.items">
            <template #columns>
              <a-table-column title="名称" data-index="name"></a-table-column>
              <a-table-column title="描述" data-index="description"></a-table-column>
              <a-table-column title="负责人" data-index="owner"></a-table-column>
              <a-table-column title="地址" data-index="code_repository.ssh_url"></a-table-column>

              <a-table-column align="center" title="导入" :width="200">
                <template #cell="{ record }">
                  <a-switch type="round" :default-checked="record.id !== ''">
                    <template #checked> ON </template>
                    <template #unchecked> OFF </template>
                  </a-switch>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </div>

        <a-space :size="app.size">
          <a-button type="secondary" :disabled="current <= 1" @click="onPrev">
            <IconLeft /> 上一步
          </a-button>
          <a-button type="primary" :loading="nextLoading" v-show="current < 2" @click="onNext">
            下一步 <IconRight />
          </a-button>
          <a-button
            type="primary"
            v-show="current >= 2"
            @click="router.push({ name: 'ServiceList' })"
          >
            完成 <IconRight />
          </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.step-content {
  margin-top: 12px;
  width: 100%;
  text-align: center;
  background: var(--color-bg-2);
  color: #c2c7cc;
}
</style>
