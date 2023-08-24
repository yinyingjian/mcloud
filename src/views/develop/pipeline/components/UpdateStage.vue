<script setup>
import { ref, watch } from 'vue'

// 定义v-model:visible
const props = defineProps(['visible', 'stage', 'maxNumber'])
const emit = defineEmits(['update:visible', 'change', 'delete'])

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
  updateStageForm.value.resetFields()
}

// form
const updateStageForm = ref()
const form = ref({})

watch(
  () => props.visible,
  async (newV) => {
    if (newV) {
      form.value = JSON.parse(JSON.stringify(props.stage))
    }
  }
)

// 通知外层删除
const deleteStage = () => {
  emit('delete', props.stage)
  emit('update:visible', false)
}
</script>

<template>
  <div>
    <a-drawer
      :width="'80%'"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      :header="false"
      :footer="false"
      unmountOnClose
    >
      <a-form ref="updateStageForm" :model="form" auto-label-width>
        <a-tabs default-active-key="base">
          <template #extra>
            <a-button size="mini" type="text" status="danger" @click="deleteStage">
              <template #icon>
                <icon-delete />
              </template>
              删除
            </a-button>
          </template>
          <a-tab-pane key="base" title="基本信息">
            <div class="page">
              <a-form-item
                field="number"
                label="编号"
                required
                :help="`步骤编号, 如果阶段是串行执行, 通过步骤编号可以调整步骤执行的先后顺序, 最大值${maxNumber}`"
              >
                <a-input-number v-model="form.number" :min="1" :max="maxNumber" />
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
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-form>
    </a-drawer>
  </div>
</template>
