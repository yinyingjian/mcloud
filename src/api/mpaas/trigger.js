import instance from '../client'

// 查询触发配置
export var LIST_TRIGGER = (params) => {
  return instance.get('/mcenter/api/v1/triggers', { params })
}
