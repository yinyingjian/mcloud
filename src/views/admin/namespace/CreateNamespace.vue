<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { CREATE_SUB_USER } from '@/api/mcenter/user'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const form = reactive({
  username: '',
  password: '',
  profile: {
    real_name: '',
    nick_name: '',
    phone: '',
    email: '',
    address: '',
    gender: 'UNKNOWN',
    avatar: ''
  }
})

// 提交处理
const submitLoading = ref(false)
const handleSubmit = async (data) => {
  if (!data.errors) {
    try {
      submitLoading.value = true
      let resp = await CREATE_SUB_USER(data.values)
      console.log(resp)
      router.push({ name: 'SubUserList' })
    } catch (error) {
      Message.error(`保存失败: ${error}`)
    } finally {
      submitLoading.value = false
    }
  }
}
</script>

<template>
  <div>
    <!-- 页头 -->
    <a-page-header title="创建空间" @back="router.go(-1)"> </a-page-header>

    <div>
      <a-form :model="form" @submit="handleSubmit" auto-label-width>
        <a-collapse :default-active-key="['1', '2']">
          <a-collapse-item header="账号信息" key="1">
            <a-form-item field="username" label="用户名" required>
              <a-input v-model="form.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码" required>
              <a-input-password v-model="form.password" placeholder="请输入密码" />
            </a-form-item>
            <a-form-item field="description" label="描述">
              <a-input v-model="form.description" />
            </a-form-item>
          </a-collapse-item>
          <a-collapse-item header="用户信息" key="2">
            <a-form-item field="profile.real_name" label="姓名">
              <a-input v-model="form.profile.real_name" />
            </a-form-item>
            <a-form-item field="profile.nick_name" label="昵称">
              <a-input v-model="form.profile.nick_name" />
            </a-form-item>
            <a-form-item field="profile.phone" label="电话">
              <a-input v-model="form.profile.phone" />
            </a-form-item>
            <a-form-item field="profile.email" label="邮箱" required>
              <a-input v-model="form.profile.email" />
            </a-form-item>
            <a-form-item field="profile.address" label="地址">
              <a-input v-model="form.profile.address" />
            </a-form-item>
            <a-form-item field="profile.gender" label="性别">
              <a-radio-group type="button" v-model="form.profile.gender">
                <a-radio value="UNKNOWN">保密</a-radio>
                <a-radio value="MALE">男</a-radio>
                <a-radio value="FEMALE">女</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item field="profile.avatar" label="头像">
              <a-input v-model="form.profile.avatar" />
            </a-form-item>
          </a-collapse-item>
        </a-collapse>

        <div class="form-submit">
          <a-space>
            <a-button @click="router.push({ name: 'SubUserList' })">取消</a-button>
            <a-button type="primary" html-type="submit" :loading="submitLoading">保存</a-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </div>
</template>

<style scoped></style>
