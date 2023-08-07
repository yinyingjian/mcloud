<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="page">
    <!-- 页头 -->
    <a-page-header title="Job详情" @back="router.go(-1)"> </a-page-header>
  </div>
</template>
