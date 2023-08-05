<script setup>
import dayjs from 'dayjs'

// 定义属性
defineProps(['timestamp'])
</script>

<template>
  <span>{{ dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm') }}</span>
</template>
