import instance from '../client'

// 查询子用户列表
export var LIST_SUB_USER = (params) => {
  return instance.get('/mcenter/api/v1/user/sub', { params })
}

// 创建用户
export var CREATE_SUB_USER = (data) => {
  return instance.post('/mcenter/api/v1/user/sub', data)
}
