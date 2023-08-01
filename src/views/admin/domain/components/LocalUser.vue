<script setup>
// 声明属性
defineProps({
  securitySetting: Object
})
</script>

<template>
  <div class="page">
    {{ securitySetting }}
  </div>
</template>
