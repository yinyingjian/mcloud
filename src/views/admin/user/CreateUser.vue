<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

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
const handleSubmit = (data) => {
  console.log(data)
}
</script>

<template>
  <div>
    <!-- 页头 -->
    <a-page-header title="创建用户" @back="router.go(-1)"> </a-page-header>

    <div>
      <a-form :model="form" @submit="handleSubmit" auto-label-width>
        <a-collapse :default-active-key="['1', '2']">
          <a-collapse-item header="账号信息" key="1">
            <a-form-item field="username" label="用户名">
              <a-input v-model="form.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码">
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
            <a-form-item field="profile.email" label="邮箱">
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
            <a-button>取消</a-button>
            <a-button type="primary" html-type="submit">确认</a-button>
          </a-space>
        </div>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
.form-submit {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
