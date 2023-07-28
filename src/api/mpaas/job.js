import instance from '../client'

// 查询Job
export var LIST_JOB = (params) => {
  return instance.get('/mpaas/api/v1/jobs', { params })
}
