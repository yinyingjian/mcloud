<script setup>
import { reactive } from 'vue'

// 声明属性
const props = defineProps({
  feishuSetting: Object
})

// 表单
const form = reactive({
  enabled: props.enabled
})

//
const handleSubmit = () => {}
</script>

<template>
  <div class="page">
    <a-card>
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item field="enabled" label="启动">
          <a-switch type="round" v-model="form.enabled" />
        </a-form-item>
      </a-form>
      {{ feishuSetting }}
    </a-card>
  </div>
</template>
