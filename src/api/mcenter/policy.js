import instance from '../client'

// 查询授权策略
export var LIST_POLICY = (params) => {
  return instance.get('/mcenter/api/v1/policy', { params })
}

// 查询授权策略详情
export var GET_POLICY = (id) => {
  return instance.get(`/mcenter/api/v1/policy/${id}`)
}

// 创建策略
export var CREATE_POLICY = (data) => {
  return instance.post('/mcenter/api/v1/policy', data)
}
