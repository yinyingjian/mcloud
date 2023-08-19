<script setup>
import { GET_PIPELINE } from '@/api/mpaas/pipeline'
import { Notification } from '@arco-design/web-vue'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import AddStage from './components/AddStage.vue'
import AddStep from './components/AddStep.vue'

const router = useRouter()
const id = router.currentRoute.value.params.id
const pipeline = ref({})
const GetPipeline = async () => {
  try {
    let resp = await GET_PIPELINE(id)
    pipeline.value = resp
  } catch (error) {
    Notification.error(`查询Pipeline详情失败: ${error}`)
  }
}

onBeforeMount(async () => {
  await GetPipeline()
})

// 变量
const stepItemKeyStyle = {
  width: '40px',
  height: '40px',
  fontSize: '12px'
}
const stepItemValueStyle = {
  height: '40px',
  width: '220px'
}

// 弹窗变量
const showAddStage = ref(false)
const showAddStep = ref(false)
</script>

<template>
  <!-- 页头 -->
  <a-page-header title="Pipeline详情" @back="router.push({ name: 'DomainPipelineList' })">
  </a-page-header>
  <div class="page">
    <a-card :header-style="{ height: '36px' }" :body-style="{ padding: '0px 8px 8px 8px' }">
      <template #title>
        <span>【{{ pipeline.name }}】</span>
        <span>{{ pipeline.create_by }}</span>
        <span>创建于</span><ShowTime :timestamp="pipeline.create_at"></ShowTime>
      </template>
      <template #extra>
        <a-button size="mini" type="text">Web Hooks</a-button>
        <a-button size="mini" type="text">关注人</a-button>
        <a-button size="mini" type="text">变量</a-button>
      </template>
      <div class="stage">
        <a-card
          v-for="(stage, index) in pipeline.stages"
          :key="'stage_' + index"
          class="stage-card"
        >
          <template #title>
            <span>{{ stage.name }}</span>
          </template>
          <template #extra>
            <span class="f12" v-if="stage.is_parallel">并行</span>
            <span class="f12" v-else>串行</span>
            <a-button size="mini" type="text">变量</a-button>
          </template>
          <div class="stage-step">
            <a-button-group
              v-for="(job, index) in stage.jobs"
              :key="'job_' + index"
              class="stage-step-item"
            >
              <a-button :style="stepItemKeyStyle" @click="router.push({ name: '' })">
                <template #icon>
                  <SvgIcon
                    v-if="job.extension && job.extension.job_icon"
                    :svgCode="job.extension.job_icon"
                  ></SvgIcon>
                  <span v-else>{{ job.job_name.slice(0, 3) }}</span>
                </template>
              </a-button>
              <a-button :style="stepItemValueStyle">{{ job.task_name }}</a-button>
            </a-button-group>
            <div style="margin-top: 12px">
              <a-button type="outline" class="add-step-btn" @click="showAddStep = true">
                <template #icon>
                  <icon-plus />
                </template>
                添加步骤
              </a-button>
              <AddStep v-model:visible="showAddStep"></AddStep>
            </div>
          </div>
        </a-card>
        <div class="add-stage" @click="showAddStage = true">
          <icon-plus />
          <span style="margin-left: 8px">添加阶段</span>
        </div>
        <AddStage
          @change="GetPipeline"
          v-model:visible="showAddStage"
          :pipeline="pipeline"
        ></AddStage>
      </div>
    </a-card>
  </div>
</template>

<style scoped>
.stage {
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
  height: 700px;
}

.stage-card {
  flex-basis: 360px;
  flex-shrink: 0;
  width: 360px;
  height: 660px;
  margin-left: 12px;
  transition-property: all;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.add-stage {
  flex-basis: 200px;
  flex-shrink: 0;
  margin-left: 12px;
  height: 200px;
  width: 200px;
  color: rgb(var(--primary-6));
  background-color: var(--color-bg-2);
  border: 1px dashed rgb(var(--primary-6));
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-step-btn {
  width: 260px;
}

.stage-step-item {
  margin-top: 12px;
}

.arco-btn-outline,
.arco-btn-outline[type='button'] :deep(.add-step-botton) {
  border: 1px dashed rgb(var(--primary-6));
}
</style>
