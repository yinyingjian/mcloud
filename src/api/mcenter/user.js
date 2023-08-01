import instance from '../client'

// 查询子用户列表
export var LIST_SUB_USER = (params) => {
  return instance.get('/mcenter/api/v1/user/sub', { params })
}

// 查询子用户详情
export var GET_SUB_USER = (id) => {
  return instance.get(`/mcenter/api/v1/user/sub/${id}`)
}

// 创建用户
export var CREATE_SUB_USER = (data) => {
  return instance.post('/mcenter/api/v1/user/sub', data)
}

// 更新用户
export var UPDATE_SUB_USER = (id, data) => {
  return instance.put(`/mcenter/api/v1/user/sub/${id}`, data)
}

// 重置用户密码
export var RESET_SUB_USER_PASS = (id, data) => {
  return instance.post(`/mcenter/api/v1/user/sub/${id}/password`, data)
}
