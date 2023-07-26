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
          redirect: { name: 'UserList' },
          children: [
            {
              path: 'user/list',
              name: 'UserList',
              component: () => import('@/views/admin/user/ListPage.vue')
            },
            {
              path: 'namespace/list',
              name: 'NamespaceList',
              component: () => import('@/views/admin/namespace/ListPage.vue')
            },
            {
              path: 'role/list',
              name: 'RoleList',
              component: () => import('@/views/admin/role/ListPage.vue')
            },
            {
              path: 'label/list',
              name: 'LabelList',
              component: () => import('@/views/admin/label/ListPage.vue')
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
      redirect: { name: 'PolicyList' },
      children: [
        {
          path: 'policy/list',
          name: 'PolicyList',
          component: () => import('@/views/setting/policy/ListPage.vue')
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
              component: () => import('@/views/resource/k8s/ListPage.vue')
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
      redirect: { name: 'ServiceList' },
      children: [
        {
          path: 'tool',
          name: 'DevToolManage',
          component: () => import('@/components/RedirectPage.vue'),
          redirect: { name: 'DomainPipelineList' },
          children: [
            {
              path: 'pipeline/list',
              name: 'DomainPipelineList',
              component: () => import('@/views/develop/pipeline/ListPage.vue')
            },
            {
              path: 'job/list',
              name: 'DomainJobList',
              component: () => import('@/views/develop/job/ListPage.vue')
            }
          ]
        },
        {
          path: 'service/list',
          name: 'ServiceList',
          component: () => import('@/views/develop/service/ListPage.vue')
        },
        {
          path: 'approval/list',
          name: 'ApprovalList',
          component: () => import('@/views/develop/approval/ListPage.vue')
        },
        {
          path: 'deploy/list',
          name: 'DeployList',
          component: () => import('@/views/develop/deploy/ListPage.vue')
        },
        {
          path: 'trigger/list',
          name: 'TriggerList',
          component: () => import('@/views/develop/trigger/ListPage.vue')
        }
      ]
    }
  ]
})

// 对Router进行导航守卫的设置
// 全局前置守卫
router.beforeEach(beforeEachHanler)

export default router
