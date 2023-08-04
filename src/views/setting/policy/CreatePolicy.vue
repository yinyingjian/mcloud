<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { GET_POLICY, CREATE_POLICY } from '@/api/mcenter/policy'
import { Message } from '@arco-design/web-vue'
import SearchUser from '@/components/SearchUser.vue'

const router = useRouter()
const form = ref({
  enabled: true,
  user_id: '',
  role_id: '',
  scope: [],
  expired_time: 0
})

// 提交处理
const submitLoading = ref(false)
const handleSubmit = async (data) => {
  if (!data.errors) {
    try {
      submitLoading.value = true
      let resp = await CREATE_POLICY(data.values)
      console.log(resp)
      router.push({ name: 'NamespaceList' })
    } catch (error) {
      Message.error(`保存失败: ${error}`)
    } finally {
      submitLoading.value = false
    }
  }
}

// 判断更新模式
let pageHeader = '创建策略'
const id = router.currentRoute.value.query.id
const isCreate = id === undefined
const GetNamespace = async () => {
  if (!isCreate) {
    pageHeader = '编辑策略'
    try {
      form.value = await GET_POLICY(id)
    } catch (error) {
      Message.error(`查询空间失败: ${error}`)
    }
  }
}
onBeforeMount(async () => {
  GetNamespace()
})
</script>

<template>
  <div class="page">
    <!-- 页头 -->
    <a-page-header :title="pageHeader" @back="router.go(-1)"> </a-page-header>

    <a-card>
      <a-form :model="form" @submit="handleSubmit" auto-label-width>
        <a-form-item field="enabled" label="启用" class="enable-line" help="启用后该策略才会生效">
          <a-switch type="round" v-model="form.enabled" />
        </a-form-item>

        <a-form-item field="user_id" label="用户" help="请输入用户名进行模糊搜索" required>
          <SearchUser v-model="form.user_id"></SearchUser>
        </a-form-item>
        <a-form-item field="role_id" label="角色" required>
          <a-input v-model="form.role_id" placeholder="请输入空间名称" />
        </a-form-item>
        <a-form-item field="expired_time" label="过期时间" required>
          <a-input v-model="form.expired_time" placeholder="请输入空间名称" />
        </a-form-item>
        <div class="form-submit">
          <a-space>
            <a-button @click="router.push({ name: 'NamespaceList' })">取消</a-button>
            <a-button type="primary" html-type="submit" :loading="submitLoading">保存</a-button>
          </a-space>
        </div>
      </a-form>
    </a-card>
  </div>
</template>

<style scoped></style>

<!-- // CreatePolicyRequest 创建策略的请求
message CreatePolicyRequest {
      // 启用该策略
    // @gotags: bson:"enabled" json:"enabled"
    bool enabled = 9; 

    // 用户
    // @gotags: bson:"username" json:"username" validate:"required,lte=120"
    string username = 4;
    // 角色Id
    // @gotags: bson:"role_id" json:"role_id" validate:"required,lte=40"
    string role_id = 5;
    // 该角色的生效范围
    // @gotags: bson:"scope" json:"scope"
    repeated mcube.resource.LabelRequirement scope = 6;
    // 策略过期时间
    // @gotags: bson:"expired_time" json:"expired_time"
    int64 expired_time = 7;
    // 只读策略, 不允许用户修改, 一般用于系统管理
    // @gotags: bson:"read_only" json:"read_only"
    bool read_only = 8;
 
    // 扩展属性
    // @gotags: bson:"extra" json:"extra"
    map<string,string> extra = 14; 
    // 标签
    // @gotags: bson:"labels" json:"labels"
    map<string,string> labels = 15;        
} -->
