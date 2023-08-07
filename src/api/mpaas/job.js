import instance from '../client'

// 查询Job
export var LIST_JOB = (params) => {
  return instance.get('/mpaas/api/v1/jobs', { params })
}

// 查询Job详情
export var GET_JOB = (id) => {
  return instance.get(`/mpaas/api/v1/jobs/${id}`)
}

// 创建Job
export var CREATE_JOB = (data) => {
  return instance.post('/mpaas/api/v1/jobs', data)
}
