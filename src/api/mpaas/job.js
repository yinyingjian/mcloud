import instance from '../client'

// 查询Job
export var LIST_JOB = (params) => {
  return instance.get('/mcenter/api/v1/jobs', { params })
}
