<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  record: Object
})
console.log(props.record)

const form = reactive({
  new_pass: '',
  new_pass_repeat: '',
  is_reset: true,
  reset_reason: '管理员重置密码'
})

const submitLoading = ref(false)
const handleSubmit = async (data) => {
  console.log(data)
}
</script>

<template>
  <div>
    <a-form :model="form" @submit="handleSubmit" auto-label-width>
      <a-form-item field="new_pass" label="新密码" required>
        <a-input-password v-model="form.new_pass" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item field="new_pass_repeat" label="确认" required>
        <a-input-password v-model="form.new_pass_repeat" placeholder="请再次输入相同的密码" />
      </a-form-item>

      <div class="form-submit">
        <a-space>
          <a-button>取消</a-button>
          <a-button type="primary" html-type="submit" :loading="submitLoading">保存</a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<style scoped></style>
