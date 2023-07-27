import instance from '../client'

// 查询流水线列表
export var LIST_PIPELINE = (params) => {
  return instance.get('/mcenter/api/v1/pipelines', { params })
}
