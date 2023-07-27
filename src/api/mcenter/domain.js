import instance from '../client'

// 查询域详情, 只有主账号可以查询
export var GET_DOMAIN = (name) => {
  return instance.get(`/mcenter/api/v1/domain/${name}`)
}
