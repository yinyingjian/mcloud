import instance from '../client'

// 登录
export var ISSUE_TOKEN = (data) => {
  return instance.post('/mcenter/api/v1/token', data)
}

// 切换命名空间
export var CHANGE_NAMESPACE = (data) => {
  return instance.patch('/mcenter/api/v1/token', data)
}
