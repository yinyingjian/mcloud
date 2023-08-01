<script setup>
import { app } from '@/stores/localstorage'
import LocalUser from './components/LocalUser.vue'
import LdpaSetting from './components/LdpaSetting.vue'
import FeishuSetting from './components/FeishuSetting.vue'
import { GET_DOMAIN } from '@/api/mcenter/domain'
import { onBeforeMount, ref } from 'vue'

const settings = ref({
  security_setting: {}
})
onBeforeMount(async () => {
  try {
    let resp = await GET_DOMAIN(app.value.token.domain)
    settings.value = resp
    console.log(settings.value)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div>
    <a-tabs :size="app.size">
      <a-tab-pane key="PASSWORD" title="本地用户">
        <LocalUser :security-setting="settings.security_setting" />
      </a-tab-pane>
      <a-tab-pane key="LDAP" title="LDAP">
        <LdpaSetting :ldap-setting="settings.ldap_setting" />
      </a-tab-pane>
      <a-tab-pane key="FEISHU" title="飞书登录">
        <FeishuSetting :feishu-setting="settings.feishu_setting" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
