import instance from '../client'

// 查询流水线列表
export var LIST_PIPELINE = (params) => {
  return instance.get('/mpaas/api/v1/pipelines', { params })
}

// 查询流水线详情
export var GET_PIPELINE = (id) => {
  return instance.get(`/mpaas/api/v1/pipelines/${id}`)
}
