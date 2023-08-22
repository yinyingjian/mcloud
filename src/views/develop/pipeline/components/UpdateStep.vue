<script setup>
import { ref, watch } from 'vue'
import { GET_JOB } from '@/api/mpaas/job'

// 定义v-model:visible
const props = defineProps(['visible', 'step', 'maxNumber'])
const emit = defineEmits(['update:visible', 'change'])

const handleCancel = () => {
  emit('update:visible', false)
  cleanForm()
}

const handleOk = () => {
  emit('change', form.value)
  emit('update:visible', false)
  cleanForm()
}

const cleanForm = () => {
  updateStepForm.value.resetFields()
  job.value.run_param.params = []
  GetJobError.value = ''
}

// form
const updateStepForm = ref()
const form = ref({})

watch(
  () => props.step,
  async (newV) => {
    if (newV) {
      form.value =  JSON.parse(JSON.stringify(props.step)) 
      form.value.params_map = {}
      await GetJob(newV.job_name)
    }
  }
)

// 查询Job详情
const GetJobError = ref('')
const job = ref({ run_param: { params: [] } })
const GetJob = async (jobName) => {
  try {
    job.value = await GET_JOB(jobName)
  } catch (error) {
    GetJobError.value = `查询Job失败: ${error}`
  }
}
const showHelp = (text, example) => {
  let v = text
  if (example) {
    v += ', 例如 ' + example
  }
  return v
}
</script>

<template>
  <div>
    <a-drawer :width="680" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
      <template #title> 编辑步骤 </template>
      <a-form ref="updateStepForm" :model="form" auto-label-width>
        <a-form-item
          field="number"
          label="编号"
          required
          :help="`步骤编号, 如果阶段是串行执行, 通过步骤编号可以调整步骤执行的先后顺序, 最大值${maxNumber}`"
        >
          <a-input-number v-model="form.number" :min="1" :max="maxNumber" />
        </a-form-item>
        <a-form-item field="task_name" label="名称" required help="步骤名称或者描述">
          <a-input v-model="form.task_name" />
        </a-form-item>
        <a-divider orientation="center" type="dotted">任务参数</a-divider>
        <a-form-item field="job_name" label="关联任务" required help="任务的名称">
          <a-input disabled v-model="form.job_name" />
        </a-form-item>
        <div v-if="job.run_param">
          <a-form-item v-if="GetJobError">
            <a-alert type="error">{{ GetJobError }}</a-alert>
          </a-form-item>
          <a-form-item
            v-for="param in job.run_param.params"
            :key="param.name"
            :field="param.name"
            :label="param.name"
            :help="showHelp(param.name_desc, param.example)"
            :required="param.required"
          >
            <a-input v-model="form.params_map[param.name]" :disabled="param.read_only" />
          </a-form-item>
        </div>
      </a-form>
    </a-drawer>
  </div>
</template>
