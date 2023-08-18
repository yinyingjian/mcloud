<script setup>
// 定义v-model:visible
defineProps(['visible', 'pipeline'])
const emit = defineEmits(['update:visible', 'changed'])

const handleOk = () => {
  emit('update:visible', false)
}
const handleCancel = () => {
  emit('update:visible', false)
}
</script>

<template>
  <div>
    <a-modal width="auto" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title> {{ pipeline }} </template>
      <div>
        You can customize modal body text by the current situation. This modal will be closed
        immediately once you press the OK button.
      </div>
    </a-modal>
  </div>
</template>

<style scoped></style>
