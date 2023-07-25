import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../views/login/LoginPage.vue'
import { beforeEachHanler } from './permission'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录
    {
      path: "/login",
      name: "LoginPage",
      component: () => LoginPage,
    },
    // 个人主页
    {
      path: '/',
      name: 'HomePage',
      component: import("@/views/home/HomePage.vue")
    },
    // 后台管理
    {
      path: "/admin",
      name: "AdminPage",
      component: () => import("@/views/admin/LayoutPage.vue"),
      redirect: { name: 'UserList' },
      children: [
        {
          path: "user/list",
          name: "UserList",
          component: () => import("@/views/admin/user/ListPage.vue"),
        },
        {
          path: "namespace/list",
          name: "NamespaceList",
          component: () => import("@/views/admin/namespace/ListPage.vue"),
        },
        {
          path: "role/list",
          name: "RoleList",
          component: () => import("@/views/admin/role/ListPage.vue"),
        },
        {
          path: "label/list",
          name: "LabelList",
          component: () => import("@/views/admin/label/ListPage.vue"),
        }
      ]
    },
    // 空间设置
    {
      path: "/setting",
      name: "SettingPage",
      component: () => import("@/views/setting/LayoutPage.vue"),
      redirect: { name: 'PolicyList' },
      children: [
        {
          path: "policy/list",
          name: "PolicyList",
          component: () => import("@/views/setting/policy/ListPage.vue"),
        }
      ]
    },
    // 资源管理
    {
      path: "/resource",
      name: "ResourcePage",
      component: () => import("@/views/resource/LayoutPage.vue"),
      redirect: { name: 'K8sList' },
      children: [
        {
          path: "k8s/list",
          name: "K8sList",
          component: () => import("@/views/resource/k8s/ListPage.vue"),
        }
      ]
    },
    // 研发交付
    {
      path: "/develop",
      name: "DevelopPage",
      component: () => import("@/views/develop/LayoutPage.vue"),
      redirect: { name: 'ServiceList' },
      children: [
        {
          path: "service/list",
          name: "ServiceList",
          component: () => import("@/views/develop/service/ListPage.vue"),
        }
      ]
    },
  ],
});

// 对Router进行导航守卫的设置
// 全局前置守卫
router.beforeEach(beforeEachHanler)

export default router;
