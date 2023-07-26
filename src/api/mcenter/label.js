import instance from '../client'

// 查询标签列表
export var LIST_LABEL = (params) => {
  return instance.get('/mcenter/api/v1/label', { params })
}
