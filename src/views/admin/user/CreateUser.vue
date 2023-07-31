<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { CREATE_SUB_USER, GET_SUB_USER, UPDATE_SUB_USER } from '@/api/mcenter/user'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const form = ref({
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
  },
  locked: undefined,
  locked_reason: ''
})

// 判断更新模式
const uid = router.currentRoute.value.query.id
const isCreate = uid === undefined
onBeforeMount(async () => {
  if (!isCreate) {
    try {
      let resp = await GET_SUB_USER(uid)
      resp.password = ''
      form.value = resp
    } catch (error) {
      Message.error(`查询用户失败: ${error}`)
    }
  }
})

// 提交处理
const submitLoading = ref(false)
const handleSubmit = async (data) => {
  if (!data.errors) {
    if (isCreate) {
      try {
        submitLoading.value = true
        await CREATE_SUB_USER(data.values)
        router.push({ name: 'SubUserList' })
      } catch (error) {
        Message.error(`保存失败: ${error}`)
      } finally {
        submitLoading.value = false
      }
    } else {
      try {
        submitLoading.value = true
        await UPDATE_SUB_USER(uid, data.values)
        router.push({ name: 'SubUserList' })
      } catch (error) {
        Message.error(`更新失败: ${error}`)
      } finally {
        submitLoading.value = false
      }
    }
  }
}
</script>

<template>
  <div>
    <!-- 页头 -->
    <a-page-header title="创建用户" @back="router.go(-1)"> </a-page-header>

    <div>
      <a-form :model="form" @submit="handleSubmit" auto-label-width>
        <a-collapse :default-active-key="['1', '2', '3']">
          <a-collapse-item header="账号信息" key="1">
            <a-form-item field="username" label="用户名" v-if="isCreate" required>
              <a-input v-model="form.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item field="password" label="密码" v-if="isCreate" required>
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
          <a-collapse-item header="账号状态" v-if="!isCreate" key="3">
            <a-form-item field="locked" label="冻结账号" v-if="!isCreate">
              <a-switch type="round" v-model="form.locked" />
            </a-form-item>
            <a-form-item v-show="form.locked" field="locked_reason" label="冻结原因">
              <a-input v-model="form.locked_reason" />
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
