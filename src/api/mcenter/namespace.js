import instance from '../client'

// 查询空间列表
export var LIST_NAMESPACE = (params) => {
  return instance.get('/mcenter/api/v1/namespace', { params })
}

// 查询空间详情
export var GET_NAMESPACE = (id) => {
  return instance.get(`/mcenter/api/v1/namespace/${id}`)
}

// 创建空间
export var CREATE_NAMESPACE = (data) => {
  return instance.post('/mcenter/api/v1/namespace', data)
}
