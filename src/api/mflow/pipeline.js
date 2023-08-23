import instance from '../client'

// 查询流水线列表
export var LIST_PIPELINE = (params) => {
  return instance.get('/mflow/api/v1/pipelines', { params })
}

// 查询流水线详情
export var GET_PIPELINE = (id) => {
  return instance.get(`/mflow/api/v1/pipelines/${id}`)
}

// 更新流水线详情
export var UPDATE_PIPELINE = (id, data) => {
  return instance.put(`/mflow/api/v1/pipelines/${id}`, data)
}
