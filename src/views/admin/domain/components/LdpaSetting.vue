<script setup>
// 声明属性
defineProps({
  ldapSetting: Object
})
</script>

<template>
  <div class="page">
    {{ ldapSetting }}
  </div>
</template>
