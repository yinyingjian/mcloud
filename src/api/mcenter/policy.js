import instance from '../client'

// 查询授权策略
export var LIST_POLICY = (params) => {
  return instance.get('/mcenter/api/v1/policy', { params })
}
