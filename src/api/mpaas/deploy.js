import instance from '../client'

// 查询部署列表
export var LIST_DEPLOY = (params) => {
  return instance.get('/mcenter/api/v1/deploys', { params })
}
