<script setup>
import { ref, watch } from 'vue'

// job对象
const props = defineProps({
  visible: { type: Boolean, default: false },
  job: { type: Object }
})

// 定义事件 v-models
const emit = defineEmits(['update:visible'])

// 表单
const form = ref({})
watch(
  () => props.job,
  (newV) => {
    if (newV) {
      newV.run_param.params.forEach((item) => {
        form.value[item.name] = item.value
      })
    }
  },
  { immediate: true }
)

const runJobForm = ref('runJobForm')
const submitLoading = ref(false)
// 表单取消
const handleCancel = () => {
  runJobForm.value.resetFields()
  emit('update:visible', false)
}
const handleSubmit = async () => {
  const errs = await runJobForm.value.validate()
  if (!errs) {
    // 提交

    // 状态处理
    runJobForm.value.resetFields()
    emit('update:visible', false)
  }
}
</script>

<template>
  <a-drawer :width="680" :visible="visible" @cancel="handleCancel" unmountOnClose>
    <template #title>
      <span>运行 {{ job.name }}</span>
    </template>
    <a-form ref="runJobForm" :model="form" auto-label-width>
      <a-form-item
        v-for="param in job.run_param.params"
        :key="param.name"
        :field="param.name"
        :label="param.name"
        :help="param.name_desc"
        :required="param.required"
      >
        <a-input v-model="form[param.name]" :disabled="param.read_only" />
      </a-form-item>
    </a-form>
    <template #footer>
      <div class="form-submit">
        <a-space>
          <a-button @click="handleCancel">取消</a-button>
          <a-button
            type="primary"
            html-type="submit"
            @click="handleSubmit"
            :loading="submitLoading"
          >
            保存
          </a-button>
        </a-space>
      </div>
    </template>
  </a-drawer>
</template>

<style scoped></style>
