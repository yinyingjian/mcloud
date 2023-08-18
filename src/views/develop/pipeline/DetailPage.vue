<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <!-- 页头 -->
  <a-page-header title="Pipeline详情" @back="router.push({ name: 'DomainPipelineList' })">
  </a-page-header>
  <div class="page">
    <a-card
      title="Pipeline名称"
      :header-style="{ height: '36px' }"
      :body-style="{ padding: '0px 8px 8px 8px' }"
    >
      <template #extra>
        <a-link>变量</a-link>
      </template>
      <div class="stage">
        <a-card class="stage-card" title="构建">
          <template #extra>
            <a-link>串行</a-link>
          </template>

          <div class="stage-step">
            <a-button-group style="margin-top: 12px">
              <a-button style="width: 40px; background-color: rgb(var(--green-3))">
                <template #icon>
                  <icon-check-circle style="font-size: 20px" />
                </template>
              </a-button>
              <a-button style="width: 220px">代码安全扫描</a-button>
            </a-button-group>
            <a-button-group style="margin-top: 12px">
              <a-button style="width: 40px; background-color: rgb(var(--green-3))">
                <template #icon>
                  <icon-check-circle style="font-size: 20px" />
                </template>
              </a-button>
              <a-button style="width: 220px">单元测试覆盖率</a-button>
            </a-button-group>
            <a-button-group style="margin-top: 12px">
              <a-button style="width: 40px; background-color: rgb(var(--green-3))">
                <template #icon>
                  <icon-check-circle style="font-size: 20px" />
                </template>
              </a-button>
              <a-button style="width: 220px">容器镜像构建</a-button>
            </a-button-group>
            <div style="margin-top: 12px">
              <a-button type="outline" style="width: 260px">添加任务</a-button>
            </div>
          </div>
        </a-card>

        <a-card class="stage-card" title="部署">
          <template #extra>
            <a-link>并行</a-link>
          </template>
          <div class="stage-step">
            <a-button-group style="margin-top: 12px">
              <a-button style="width: 40px; background-color: rgb(var(--green-3))">
                <template #icon>
                  <icon-check-circle style="font-size: 20px" />
                </template>
              </a-button>
              <a-button style="width: 220px">容器镜像部署</a-button>
            </a-button-group>
            <a-button-group style="margin-top: 12px">
              <a-button style="width: 40px; background-color: rgb(var(--green-3))">
                <template #icon>
                  <icon-check-circle style="font-size: 20px" />
                </template>
              </a-button>
              <a-button style="width: 220px">容器镜像部署</a-button>
            </a-button-group>
            <div style="margin-top: 12px">
              <a-button type="outline" style="width: 260px">添加任务</a-button>
            </div>
          </div>
        </a-card>

        <a-card class="stage-card" title="代码合并">
          <template #extra>
            <a-link>串行</a-link>
          </template>
          <div class="stage-step">
            <div>
              <a-button-group style="margin-top: 12px">
                <a-button style="width: 40px; background-color: rgb(var(--green-3))">
                  <template #icon>
                    <icon-check-circle style="font-size: 20px" />
                  </template>
                </a-button>
                <a-button style="width: 220px">代码Merge会Dev分支</a-button>
              </a-button-group>
            </div>
            <div style="margin-top: 12px">
              <a-button class="add-step-botton" type="outline" style="width: 260px"
                >添加任务</a-button
              >
            </div>
          </div>
        </a-card>

        <div class="add-stage">
          <icon-plus />
          <span>添加阶段</span>
        </div>
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

.arco-btn-outline,
.arco-btn-outline[type='button'] :deep(.add-step-botton) {
  border: 1px dashed rgb(var(--primary-6));
}
</style>
