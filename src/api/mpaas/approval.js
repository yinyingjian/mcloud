import instance from '../client'

// 查询Pipeline审批
export var LIST_APPROVAL = (params) => {
  return instance.get('/mpaas/api/v1/approvals', { params })
}
