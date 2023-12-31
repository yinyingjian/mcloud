<script setup>
import { ref, watch } from 'vue'
import { UPDATE_PIPELINE } from '@/api/mflow/pipeline'
import { Notification } from '@arco-design/web-vue'

// 定义v-model:visible
const props = defineProps(['visible', 'pipeline'])
const emit = defineEmits(['update:visible', 'change'])

const handleCancel = () => {
  emit('update:visible', false)
}

// Stage表单
const fromRef = ref(undefined)
const form = ref({
  number: 1,
  name: '',
  is_parallel: false,
  with: [],
  jobs: []
})

const maxCount = ref(100)
watch(
  () => props.pipeline,
  (newV) => {
    if (newV) {
      maxCount.value = props.pipeline.stages.length + 1
      form.value.number = maxCount.value
    }
  }
)

// 提交处理
const submitLoading = ref(false)
const handleSubmit = async () => {
  var valiatedErr = await fromRef.value.validate()
  if (valiatedErr) {
    return
  }

  try {
    submitLoading.value = true
    let req = JSON.parse(JSON.stringify(props.pipeline))
    req.stages.splice(form.value.number - 1, 0, form.value)
    await UPDATE_PIPELINE(props.pipeline.id, req)
    Notification.success(`保存成功`)
    // 清理
    fromRef.value.resetFields()
    emit('change', true)
    // 关闭
    emit('update:visible', false)
  } catch (error) {
    Notification.error(`保存失败: ${error}`)
  } finally {
    submitLoading.value = false
  }
}
</script>

<template>
  <div>
    <a-modal
      width="auto"
      :visible="visible"
      @ok="handleSubmit"
      @cancel="handleCancel"
      draggable
      :closable="false"
      unmount-on-close
    >
      <template #title> 添加阶段 </template>
      <a-form ref="fromRef" :model="form" @submit="handleSubmit" auto-label-width>
        <a-form-item
          field="number"
          label="编号"
          required
          help="阶段编号, 默认新增的阶段放到尾部, 如果你想调整到第一个,请修改为1"
        >
          <a-input-number v-model="form.number" :min="1" :max="maxCount" />
        </a-form-item>
        <a-form-item field="name" label="描述" required help="阶段描述信息">
          <a-input v-model="form.name" />
        </a-form-item>
        <a-form-item
          field="is_parallel"
          label="并行执行"
          help="并行执行时, 该阶段的所有任务同时执行, 但是需要等待所有任务完成后才会继续执行后面阶段"
        >
          <a-switch type="round" v-model="form.is_parallel">
            <template #checked> ON </template>
            <template #unchecked> OFF </template>
          </a-switch>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style scoped></style>
