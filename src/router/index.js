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
  ],
});

// 对Router进行导航守卫的设置
// 全局前置守卫
router.beforeEach(beforeEachHanler)

export default router;
