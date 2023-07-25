import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../views/home/HomePage.vue'
import { beforeEachHanler } from './permission'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 登录
    {
      path: "/login",
      name: "LoginPage",
      component: () => import("@/views/login/LoginPage.vue"),
    },
    // 个人主页
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    // 后台管理
    {
      path: "/admin",
      name: "DomainPage",
      component: () => import("@/views/admin/LayoutPage.vue"),
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
      name: "NamespaceSetting",
      component: () => import("@/views/setting/LayoutPage.vue"),
      children: [
        {
          path: "policy/list",
          name: "PolicyList",
          component: () => import("@/views/setting/policy/ListPage.vue"), 
        }
      ]
    },
    // 研发交付
    {
      path: "/develop",
      name: "DevelopPage",
      component: () => import("@/views/develop/LayoutPage.vue"),
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
