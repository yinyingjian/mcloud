<script setup>
import { onMounted, reactive, ref } from 'vue'

// 声明属性
const props = defineProps({
  feishuSetting: Object
})

// 表单
const form = reactive({
  enabled: false,
  app_id: '',
  app_secret: '',
  redirect_uri: ''
})
const initForm = () => {
  form.enabled = props.feishuSetting.enabled
  form.app_id = props.feishuSetting.app_id
  form.app_secret = props.feishuSetting.app_secret
  form.redirect_uri = props.feishuSetting.redirect_uri
  checkIsEdit()
}
onMounted(() => {
  initForm()
})

// 表单是否处于编辑中
const isEdit = ref(false)
const checkIsEdit = () => {
  const ov = JSON.stringify(props.feishuSetting)
  const nv = JSON.stringify(form)
  isEdit.value = ov !== nv
}

// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {
  const payload = JSON.parse(JSON.stringify(form))
  // 密码未修改时 不提交
  if (props.feishuSetting.app_secret === payload.app_secret) {
    payload.app_secret = ''
  }
  console.log(payload)
}
</script>

<template>
  <div class="page">
    <a-card>
      <a-form :model="form" @submit="handleSubmit" auto-label-width>
        <a-form-item field="enabled" label="启动">
          <a-switch type="round" v-model="form.enabled" @change="checkIsEdit" />
        </a-form-item>
        <a-form-item field="app_id" label="App ID" :required="form.enabled">
          <a-input v-model="form.app_id" @change="checkIsEdit"> </a-input>
        </a-form-item>
        <a-form-item field="app_secret" label="App Secret" :required="form.enabled">
          <a-input v-model="form.app_secret" @change="checkIsEdit"> </a-input>
        </a-form-item>
        <a-form-item field="redirect_uri" label="重定向地址" :required="form.enabled">
          <a-input v-model="form.redirect_uri" @change="checkIsEdit"> </a-input>
        </a-form-item>
      </a-form>
      <div class="form-submit">
        <a-space>
          <a-button @click="initForm" :disabled="!isEdit">取消</a-button>
          <a-button type="primary" html-type="submit" :disabled="!isEdit" :loading="submitLoading"
            >保存</a-button
          >
        </a-space>
      </div>
    </a-card>
  </div>
</template>
