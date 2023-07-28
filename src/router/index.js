import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/login/LoginPage.vue'
import { beforeEachHanler } from './permission'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录
    {
      path: '/login',
      name: 'LoginPage',
      component: () => LoginPage
    },
    // 个人主页
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/home/HomePage.vue')
    },
    // 后台管理
    {
      path: '/admin',
      name: 'AdminPage',
      component: () => import('@/views/admin/LayoutPage.vue'),
      redirect: { name: 'PermissionManage' },
      children: [
        {
          path: 'permission',
          name: 'PermissionManage',
          component: () => import('@/components/RedirectPage.vue'),
          meta: { label: '权限管理' },
          redirect: { name: 'UserList' },
          children: [
            {
              path: 'domain/get',
              name: 'DomainDetail',
              component: () => import('@/views/admin/domain/DetailPage.vue')
            },
            {
              path: 'user/list',
              name: 'UserList',
              component: () => import('@/views/admin/user/ListPage.vue'),
              meta: { label: '用户列表' }
            },
            {
              path: 'namespace/list',
              name: 'NamespaceList',
              component: () => import('@/views/admin/namespace/ListPage.vue'),
              meta: { label: '空间列表' }
            },
            {
              path: 'role/list',
              name: 'RoleList',
              component: () => import('@/views/admin/role/ListPage.vue'),
              meta: { label: '角色列表' }
            },
            {
              path: 'label/list',
              name: 'LabelList',
              component: () => import('@/views/admin/label/ListPage.vue'),
              meta: { label: '标签列表' }
            }
          ]
        },
        {
          path: 'audit',
          name: 'AuditManage',
          component: () => import('@/components/RedirectPage.vue'),
          redirect: { name: 'LoginLog' },
          children: [
            {
              path: 'log/login',
              name: 'AuditLoginLog',
              component: () => import('@/views/admin/audit/LoginLog.vue')
            },
            {
              path: 'log/operate',
              name: 'AuditOperateLog',
              component: () => import('@/views/admin/audit/OperateLog.vue')
            }
          ]
        }
      ]
    },
    // 空间设置
    {
      path: '/setting',
      name: 'SettingPage',
      component: () => import('@/views/setting/LayoutPage.vue'),
      redirect: { name: 'NamespacePermission' },
      children: [
        {
          path: 'permission',
          name: 'NamespacePermission',
          component: () => import('@/components/RedirectPage.vue'),
          meta: { label: '权限管理' },
          redirect: { name: 'NamespacePolicyList' },
          children: [
            {
              path: 'policy/list',
              name: 'NamespacePolicyList',
              component: () => import('@/views/setting/policy/ListPage.vue'),
              meta: { label: '策略列表' }
            }
          ]
        }
      ]
    },
    // 资源管理
    {
      path: '/resource',
      name: 'ResourcePage',
      component: () => import('@/views/resource/LayoutPage.vue'),
      redirect: { name: 'ResourceList' },
      children: [
        {
          path: 'list',
          name: 'ResourceList',
          component: () => import('@/components/RedirectPage.vue'),
          meta: { label: '资源列表' },
          redirect: { name: 'ResourceSearch' },
          children: [
            {
              path: 'search',
              name: 'ResourceSearch',
              component: () => import('@/views/resource/SearchPage.vue')
            },
            {
              path: 'k8s',
              name: 'K8sList',
              component: () => import('@/views/resource/k8s/ListPage.vue'),
              meta: { label: 'k8s集群' }
            },
            {
              path: 'host/list',
              name: 'HostList',
              component: () => import('@/views/resource/host/ListPage.vue')
            },
            {
              path: 'gateway/list',
              name: 'GatewayList',
              component: () => import('@/views/resource/gateway/ListPage.vue')
            }
          ]
        },
        {
          path: 'sync',
          name: 'ResourceSync',
          component: () => import('@/components/RedirectPage.vue'),
          redirect: { name: 'ResourceTaskList' },
          children: [
            {
              path: 'task/list',
              name: 'ResourceTaskList',
              component: () => import('@/views/resource/task/ListPage.vue')
            },
            {
              path: 'secret/list',
              name: 'ResourceSecretList',
              component: () => import('@/views/resource/secret/ListPage.vue')
            }
          ]
        }
      ]
    },
    // 研发交付
    {
      path: '/develop',
      name: 'DevelopPage',
      component: () => import('@/views/develop/LayoutPage.vue'),
      redirect: { name: 'BaseDevelop' },
      children: [
        {
          path: 'base',
          name: 'BaseDevelop',
          component: () => import('@/components/RedirectPage.vue'),
          meta: { label: '服务管理' },
          redirect: { name: 'ServiceList' },
          children: [
            {
              path: 'service/list',
              name: 'ServiceList',
              component: () => import('@/views/develop/service/ListPage.vue'),
              meta: { label: '服务列表' }
            },
            {
              path: 'approval/list',
              name: 'ApprovalList',
              component: () => import('@/views/develop/approval/ListPage.vue'),
              meta: { label: '上线申请' }
            },
            {
              path: 'deploy/list',
              name: 'DeployList',
              component: () => import('@/views/develop/deploy/ListPage.vue'),
              meta: { label: '服务部署' }
            },
            {
              path: 'trigger/list',
              name: 'TriggerList',
              component: () => import('@/views/develop/trigger/ListPage.vue'),
              meta: { label: '持续构建' }
            }
          ]
        },
        {
          path: 'tool',
          name: 'DevToolManage',
          component: () => import('@/components/RedirectPage.vue'),
          meta: { label: '研发工具' },
          redirect: { name: 'DomainPipelineList' },
          children: [
            {
              path: 'pipeline/list',
              name: 'DomainPipelineList',
              component: () => import('@/views/develop/pipeline/ListPage.vue'),
              meta: { label: 'Pipeline模版' }
            },
            {
              path: 'job/list',
              name: 'DomainJobList',
              component: () => import('@/views/develop/job/ListPage.vue'),
              meta: { label: 'Job管理' }
            }
          ]
        }
      ]
    }
  ]
})

// 对Router进行导航守卫的设置
// 全局前置守卫
router.beforeEach(beforeEachHanler)

export default router
