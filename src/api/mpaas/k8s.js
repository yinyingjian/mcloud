import instance from '../client'

// 查询k8s集群
export var LIST_K8S_CLUSTER = (params) => {
  return instance.get('/mpaas/api/v1/k8s_clusters', { params })
}
