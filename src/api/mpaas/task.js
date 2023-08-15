import instance from '../client'

// 查询Job执行记录
export var LIST_JOB_TASK = (params) => {
  return instance.get('/mpaas/api/v1/job_tasks', { params })
}

// 运行Job
export var RUN_JOB_TASK = (data) => {
  return instance.post(`/mpaas/api/v1/job_tasks`, data)
}

// 查询Job执行详情
export var GET_JOB_TASK = (id) => {
  return instance.get(`/mpaas/api/v1/job_tasks/${id}`)
}

// 查询Pipeline执行记录
export var LIST_PIPELINE_TASK = (params) => {
  return instance.get('/mpaas/api/v1/pipeline_tasks', { params })
}
