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
  form.app_secret = ''
  form.redirect_uri = props.feishuSetting.redirect_uri
}
onMounted(() => {
  initForm()
})

// 提交表单
const submitLoading = ref(false)
const handleSubmit = () => {}
</script>

<template>
  <div class="page">
    <a-card>
      <a-form :model="form" @submit="handleSubmit" auto-label-width>
        <a-form-item field="enabled" label="启动">
          <a-switch type="round" v-model="form.enabled" />
        </a-form-item>
        <a-form-item field="app_id" label="App ID" :required="form.enabled">
          <a-input v-model="form.app_id"> </a-input>
        </a-form-item>
        <a-form-item field="app_secret" label="App Secret">
          <a-input v-model="form.app_secret"> </a-input>
        </a-form-item>
        <a-form-item field="redirect_uri" label="重定向地址" :required="form.enabled">
          <a-input v-model="form.redirect_uri"> </a-input>
        </a-form-item>
      </a-form>
      <div class="form-submit">
        <a-space>
          <a-button type="primary" html-type="submit" :loading="submitLoading">保存</a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>
