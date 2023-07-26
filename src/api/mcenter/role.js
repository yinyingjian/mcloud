import instance from '../client'

// 查询角色列表
export var LIST_ROLE = (params) => {
  return instance.get('/mcenter/api/v1/role', { params })
}
