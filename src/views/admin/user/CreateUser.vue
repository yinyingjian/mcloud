<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({ username: '', password: '' })
const handleSubmit = (data) => {
  console.log(data)
}
</script>

<template>
  <div>
    <!-- 页头 -->
    <a-page-header title="创建用户" @back="router.go(-1)"> </a-page-header>

    <div>
      <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
        <a-form-item field="username" label="用户名">
          <a-input v-model="form.username" placeholder="请输入用户名" />
        </a-form-item>
        <a-form-item field="password" label="密码">
          <a-input v-model="form.password" placeholder="请输入密码" />
        </a-form-item>
        <a-form-item>
          <a-button html-type="submit">确认</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped></style>
