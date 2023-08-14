<script setup>
import { ref } from 'vue'

// job对象
defineProps({
  visible: { type: Boolean, default: false },
  job: { type: Object }
})

// 定义事件 v-models
const emit = defineEmits(['update:visible'])

const handleOk = () => {
  emit('update:visible', false)
}
const handleCancel = () => {
  emit('update:visible', false)
}
const handleSubmit = () => {}

// 表单
const form = ref({})
</script>

<template>
  <a-drawer :width="680" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
    <template #title>
      <span>运行 {{ job.name }}</span>
    </template>
    <a-form :model="form" @submit="handleSubmit" auto-label-width>
      <a-form-item
        v-for="param in job.run_param.params"
        :key="param.name"
        :field="param.name"
        :label="param.name"
        :help="param.name_desc"
        :required="param.required"
      >
        <a-input v-model="param.value" :disabled="param.read_only" />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<style scoped></style>
