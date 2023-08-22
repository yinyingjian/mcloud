<script setup>
import { ref } from 'vue'

// 定义v-model
const props = defineProps(['params', 'validate'])
const emit = defineEmits(['change'])

// 查询Job详情
const showHelp = (text, example, desc) => {
  let v = text
  if (desc) {
    v += ', ' + desc
  }
  if (example) {
    v += ', 例如 ' + example
  }

  return v
}

// 修改后的值
const form = ref({})
const handleSubmit = async (data) => {
  // 判断是否需要校验
  if (props.validate && !data.errors) {
    return
  }

  // 返回修改后param数据
  const params = JSON.parse(JSON.stringify(props.params))
  params.forEach((param) => {
    param.value = form[param.name]
  })
  emit('change', params)
}
</script>

<template>
  <a-form v-if="params" ref="updateStepForm" :model="form" @submit="handleSubmit" auto-label-width>
    <a-form-item
      v-for="param in params"
      :key="param.name"
      :field="param.name"
      :label="param.name"
      :help="showHelp(param.name_desc, param.example, param.value_desc)"
      :required="param.required"
    >
      <a-input v-model="form[param.name]" :disabled="param.read_only" />
    </a-form-item>
    <div class="form-submit">
      <a-space>
        <a-button>取消</a-button>
        <a-button type="primary" html-type="submit">保存</a-button>
      </a-space>
    </div>
  </a-form>
</template>

<style scoped></style>
