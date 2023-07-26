import instance from '../client'

// 登录
export var ISSUE_TOKEN = (data) => {
  return instance.post('/mcenter/api/v1/token', data)
}
