import instance from '../client'

// 查询服务列表
export var LIST_SERVICE = (params) => {
  return instance.get('/mcenter/api/v1/service', { params })
}
