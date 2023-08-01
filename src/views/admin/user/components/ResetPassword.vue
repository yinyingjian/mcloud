<script setup>
import { reactive, ref } from 'vue'
import { RESET_SUB_USER_PASS } from '@/api/mcenter/user'
import { Message } from '@arco-design/web-vue'

// 声明属性
const props = defineProps({
  record: Object
})

// 声明事件
const emit = defineEmits(['changed'])

// form数据
const form = reactive({
  new_pass: '',
  new_pass_repeat: '',
  is_reset: true,
  reset_reason: '管理员重置密码'
})

// 表单提交
const submitLoading = ref(false)
const handleSubmit = async (data) => {
  if (!data.errors) {
    try {
      submitLoading.value = true
      await RESET_SUB_USER_PASS(props.record.id, data.values)
      emit('changed', '')
    } catch (error) {
      Message.error(`更新失败: ${error}`)
    } finally {
      submitLoading.value = false
    }
  }
}
const validatePassRule = (value, cb) => {
  if (form.new_pass !== value) {
    cb('密码不一致')
  }
}
</script>

<template>
  <div>
    <a-form :model="form" @submit="handleSubmit" auto-label-width>
      <a-form-item field="new_pass" label="新密码" required>
        <a-input-password v-model="form.new_pass" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item
        field="new_pass_repeat"
        label="确认"
        required
        :rules="[{ validator: validatePassRule }]"
      >
        <a-input-password v-model="form.new_pass_repeat" placeholder="请再次输入相同的密码" />
      </a-form-item>

      <div class="form-submit">
        <a-space>
          <a-button @click="emit('changed', '')">取消</a-button>
          <a-button type="primary" html-type="submit" :loading="submitLoading">保存</a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<style scoped></style>
