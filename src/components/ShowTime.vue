<script setup>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as isLeapYear from 'dayjs/plugin/isLeapYear'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.extend(isLeapYear)
dayjs.locale('zh-cn')

// 定义属性
defineProps({
  timestamp: { type: Number },
  relative: { type: Boolean, default: false },
  from: { type: Number }
})
</script>

<template>
  <span v-if="relative">
    <span v-if="from">
      {{ dayjs.unix(timestamp).from(dayjs.unix(from), true) }}
    </span>
    <span v-else>
      {{ dayjs.unix(timestamp).fromNow() }}
    </span>
  </span>
  <span v-else>{{ dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm') }}</span>
</template>
